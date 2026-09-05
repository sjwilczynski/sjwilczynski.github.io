import { test, expect } from "@playwright/test";
import { cp, mkdir, readFile, symlink, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { join } from "node:path";
import { promisify } from "node:util";
import socialMedia from "../../src/content/social-media/data.json";
import concerts from "../../src/content/concerts/data.json";

const exec = promisify(execFile);

// These two integration cases deliberately build isolated copies: schema tests
// alone cannot prove that Astro wires validation and CV selection correctly.
async function createSiteFixture(fixture: string) {
  const workspace = process.cwd();
  await mkdir(fixture, { recursive: true });
  await cp(join(workspace, "src"), join(fixture, "src"), { recursive: true });
  for (const filename of ["package.json", "tsconfig.json"]) {
    await cp(join(workspace, filename), join(fixture, filename));
  }
  await symlink(join(workspace, "node_modules"), join(fixture, "node_modules"));
  await writeFile(
    join(fixture, "astro.config.ts"),
    `import config from ${JSON.stringify(join(workspace, "astro.config.ts"))};
export default { ...config, cacheDir: "./.astro-cache" };\n`,
  );
  return fixture;
}

test("CV selection is independent of translated headings and social icons", async ({
  page,
}, testInfo) => {
  test.setTimeout(60_000);
  const fixture = await createSiteFixture(testInfo.outputPath("site"));

  for (const lang of ["en", "pl"]) {
    const path = join(
      fixture,
      `src/content/skills/${lang}/2-certifications.json`,
    );
    const group: Record<string, unknown> = JSON.parse(
      await readFile(path, "utf8"),
    );
    await writeFile(
      path,
      JSON.stringify({ ...group, title: "Renamed credentials" }),
    );
  }
  await writeFile(
    join(fixture, "src/content/social-media/data.json"),
    JSON.stringify(
      socialMedia.map((entry) => ({
        ...entry,
        iconName: "fa:github",
        title: "Profile",
      })),
    ),
  );

  await exec("bun", ["run", "astro:build"], {
    cwd: fixture,
    timeout: 45_000,
  });

  for (const [route, certificationsHeading, skillsHeading] of [
    ["cv", "Certifications", "Skills"],
    ["pl/cv", "Certyfikaty", "Umiejętności"],
  ]) {
    const html = await readFile(
      join(fixture, `dist/${route}/index.html`),
      "utf8",
    );
    const content = await page.evaluate((html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return {
        contacts: Array.from(doc.querySelectorAll("header a")).map((link) =>
          link.getAttribute("href"),
        ),
        sections: Array.from(doc.querySelectorAll("main section")).map(
          (section) => ({
            heading: section.querySelector("h2")?.textContent,
            text: section.textContent,
          }),
        ),
      };
    }, html);
    expect
      .soft(content.contacts)
      .toContain("https://www.linkedin.com/in/sjwilczynski/");
    expect
      .soft(
        content.sections.find(
          (section) => section.heading === certificationsHeading,
        )?.text,
      )
      .toContain("Oracle Certified Associate");
    expect
      .soft(
        content.sections.find((section) => section.heading === skillsHeading)
          ?.text,
      )
      .not.toContain("Renamed credentials");
  }
});

test("invalid concert dates stop the content build with an actionable error", async ({}, testInfo) => {
  test.setTimeout(60_000);
  const fixture = await createSiteFixture(testInfo.outputPath("site"));
  await writeFile(
    join(fixture, "src/content/concerts/data.json"),
    JSON.stringify(
      concerts.map((concert, index) =>
        index === 0 ? { ...concert, startDate: "31.02.2010" } : concert,
      ),
    ),
  );
  await expect(
    exec("bun", ["run", "astro:build"], {
      cwd: fixture,
      timeout: 45_000,
    }),
  ).rejects.toThrow(/startDate[\s\S]*Date does not exist in the calendar/);
});
