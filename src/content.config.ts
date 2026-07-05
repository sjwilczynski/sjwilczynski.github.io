import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

export const aboutSchema = z.object({
  name: z.string(),
  surname: z.string(),
  city: z.string(),
  country: z.string(),
  email: z.email(),
  githubUrl: z.url(),
  introduction: z.string(),
  interests: z.array(z.string()),
});

export const socialMediaSchema = z.object({
  link: z.url(),
  iconName: z.string(),
  title: z.string(),
});

export const resumeRoleSchema = z.object({
  title: z.string().min(1),
  // One or more date ranges for this role. Multiple ranges (e.g. a return after
  // a gap) render as separate spans; keeping them structured means each range
  // is authored explicitly instead of being comma-split at render time.
  // `.min(1)` keeps a range from being blank: renderers now key off
  // `dates.length`, so an empty string would emit an empty date span.
  dates: z.array(z.string().min(1)).nonempty(),
});

export const resumeItemSchema = z.object({
  sortOrder: z.number(),
  subheading: z.string(),
  // Each role carries its own date(s), so the title<->date pairing is enforced
  // by the schema rather than by the positional order of a flat array.
  roles: z.array(resumeRoleSchema).nonempty(),
  // Entry-level locations (e.g. offices, universities). Optional: some entries
  // (most education) have none.
  locations: z.array(z.string()).default([]),
});

export const projectSchema = z.object({
  sortOrder: z.number(),
  title: z.string().optional(),
});

export const resumeListElementSchema = z.object({
  id: z.number(),
  description: z.string(),
  title: z.string().optional(),
  date: z.string().optional(),
  iconName: z.string().optional(),
  iconClassName: z.string().optional(),
  link: z.object({ text: z.string(), url: z.url() }).optional(),
});

export const resumeListSchema = z.object({
  title: z.string().optional(),
  numColumns: z.number().optional(),
  elements: z.array(resumeListElementSchema),
});

export const concertSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  title: z.string(),
  location: z.string(),
  description: z.string(),
});

export const podcastSchema = z.object({
  sortOrder: z.number(),
  title: z.string(),
  url: z.url(),
});

const about = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/about" }),
  schema: aboutSchema,
});

const socialMedia = defineCollection({
  loader: file("src/content/social-media/data.json"),
  schema: socialMediaSchema,
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: resumeItemSchema,
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
  schema: resumeItemSchema,
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: resumeItemSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: projectSchema,
});

const achievements = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/achievements" }),
  schema: resumeListSchema,
});

const skills = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/skills" }),
  schema: resumeListSchema,
});

const concerts = defineCollection({
  loader: file("src/content/concerts/data.json"),
  schema: concertSchema,
});

const podcasts = defineCollection({
  loader: file("src/content/podcasts/data.json"),
  schema: podcastSchema,
});

export const collections = {
  about,
  "social-media": socialMedia,
  experience,
  education,
  research,
  projects,
  achievements,
  skills,
  concerts,
  podcasts,
};
