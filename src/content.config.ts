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

export const resumeItemSchema = z.object({
  sortOrder: z.number(),
  headings: z.array(z.string()),
  subheading: z.string(),
  extraInfos: z.array(z.string()),
});

export const resumeListElementSchema = z.object({
  id: z.number(),
  description: z.string(),
  title: z.string().optional(),
  date: z.string().optional(),
  iconName: z.string().optional(),
  iconClassName: z.string().optional(),
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
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: resumeListSchema,
});

const achievements = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/achievements" }),
  schema: resumeListSchema,
});

const skills = defineCollection({
  loader: file("src/content/skills/data.json"),
  schema: resumeListSchema,
});

const concerts = defineCollection({
  loader: file("src/content/concerts/data.json"),
  schema: concertSchema,
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
};
