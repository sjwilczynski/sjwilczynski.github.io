import { getCollection, getEntry } from "astro:content";
import type { Concert, Podcast, ResumeList } from "./types";
import type { Lang } from "@i18n/ui";

// Concert dates are formatted to match the page language.
const DATE_LOCALE: Record<Lang, string> = { en: "en-GB", pl: "pl-PL" };

const bySortOrder = (
  a: { data: { sortOrder: number } },
  b: { data: { sortOrder: number } },
) => a.data.sortOrder - b.data.sortOrder;

// Entry ids in localized collections look like "en/01-microsoft". Strip the
// leading locale segment to get the shared key.
const stripLocale = (id: string) => id.slice(id.indexOf("/") + 1);

const byNumericPrefix = (a: { id: string }, b: { id: string }) =>
  Number(stripLocale(a.id).split("-")[0]) -
  Number(stripLocale(b.id).split("-")[0]);

// Pick entries for `lang` from a per-locale-subdir collection, falling back to
// the English entry whenever a Polish counterpart is missing. The parity check
// (scripts/check-i18n-parity.mjs) ensures this fallback is empty in CI, but it
// keeps the site whole during incremental translation.
function pickLocale<T extends { id: string }>(entries: T[], lang: Lang): T[] {
  const of = (l: Lang) => entries.filter((e) => e.id.startsWith(l + "/"));
  const en = of("en");
  if (lang === "en") return en;
  const localized = of(lang);
  const haveKeys = new Set(localized.map((e) => stripLocale(e.id)));
  const filled = en.filter((e) => !haveKeys.has(stripLocale(e.id)));
  return [...localized, ...filled];
}

export const getData = async (lang: Lang) => {
  const aboutEntry =
    (await getEntry("about", lang)) ?? (await getEntry("about", "en"));
  if (!aboutEntry) throw new Error("About data not found");
  const about = aboutEntry.data;

  // social-media / concerts / podcasts are language-neutral single files.
  const socialMediaEntries = await getCollection("social-media");
  const socialMedias = socialMediaEntries.map((entry) => ({
    id: entry.id,
    ...entry.data,
  }));

  const experienceResumeItems = pickLocale(
    await getCollection("experience"),
    lang,
  ).sort(bySortOrder);

  const educationResumeItems = pickLocale(
    await getCollection("education"),
    lang,
  ).sort(bySortOrder);

  const researchResumeItems = pickLocale(
    await getCollection("research"),
    lang,
  ).sort(bySortOrder);

  const projectEntries = pickLocale(
    await getCollection("projects"),
    lang,
  ).sort(bySortOrder);

  const achievementsEntry =
    (await getEntry("achievements", lang)) ??
    (await getEntry("achievements", "en"));
  if (!achievementsEntry) throw new Error("Achievements data not found");
  const achievementResumeList: ResumeList = achievementsEntry.data;

  const skillsResumeLists: ResumeList[] = pickLocale(
    await getCollection("skills"),
    lang,
  )
    .sort(byNumericPrefix)
    .map((entry) => entry.data);

  const concertEntries = await getCollection("concerts");
  const concerts: Concert[] = concertEntries
    .sort(byNumericId)
    .map((entry) => ({
      id: Number(entry.id),
      date: getConcertDate(
        readDateFromString(entry.data.startDate),
        readDateFromString(entry.data.endDate),
        lang,
      ),
      title: entry.data.title,
      location: entry.data.location,
      description: entry.data.description,
    }))
    .reverse();

  const podcastEntries = await getCollection("podcasts");
  const podcasts: Podcast[] = podcastEntries
    .sort(bySortOrder)
    .map((entry) => entry.data);

  return {
    about,
    socialMedias,
    experienceResumeItems,
    educationResumeItems,
    researchResumeItems,
    projectEntries,
    achievementResumeList,
    skillsResumeLists,
    concerts,
    podcasts,
  };
};

// concerts use the numeric file id ("0","1",...) from the file() loader.
const byNumericId = (a: { id: string }, b: { id: string }) =>
  Number(a.id) - Number(b.id);

function dateToLocalizedString(date: Date, lang: Lang) {
  return date.toLocaleDateString(DATE_LOCALE[lang]);
}
function readDateFromString(date: string) {
  const [day, month, year] = date.split(".").map((part) => parseInt(part));
  return year !== undefined && month !== undefined && day !== undefined
    ? new Date(year, month - 1, day)
    : new Date();
}

function getConcertDate(startDate: Date, endDate: Date, lang: Lang): string {
  return startDate.getTime() === endDate.getTime()
    ? dateToLocalizedString(startDate, lang)
    : dateToLocalizedString(startDate, lang) +
        " - " +
        dateToLocalizedString(endDate, lang);
}
