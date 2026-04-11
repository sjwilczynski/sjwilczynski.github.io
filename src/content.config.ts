import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const about = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/about" }),
  schema: z.object({
    name: z.string(),
    surname: z.string(),
    city: z.string(),
    country: z.string(),
    email: z.string(),
    githubUrl: z.url(),
    introduction: z.string(),
  }),
});

const socialMedia = defineCollection({
  loader: file("src/content/social-media/data.json"),
  schema: z.object({
    link: z.url(),
    iconName: z.string(),
    title: z.string(),
  }),
});

const resumeItemSchema = z.object({
  sortOrder: z.number(),
  headings: z.array(z.string()),
  subheading: z.string(),
  extraInfos: z.array(z.string()),
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

const resumeListElementSchema = z.object({
  id: z.number(),
  description: z.string(),
  iconName: z.string().optional(),
  iconClassName: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    elements: z.array(resumeListElementSchema),
  }),
});

const achievements = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/achievements" }),
  schema: z.object({
    elements: z.array(resumeListElementSchema),
  }),
});

const skills = defineCollection({
  loader: file("src/content/skills/data.json"),
  schema: z.object({
    title: z.string(),
    numColumns: z.number(),
    elements: z.array(
      z.object({
        id: z.number(),
        description: z.string(),
        iconName: z.string().optional(),
      }),
    ),
  }),
});

const concerts = defineCollection({
  loader: file("src/content/concerts/data.json"),
  schema: z.object({
    startDate: z.string(),
    endDate: z.string(),
    title: z.string(),
    location: z.string(),
    description: z.string(),
  }),
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
