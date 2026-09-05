import type { z } from "astro/zod";
import type { CollectionEntry } from "astro:content";
import type { concertSchema } from "./concerts";
import type {
  aboutSchema,
  socialMediaSchema,
  resumeListSchema,
  skillGroupSchema,
  resumeListElementSchema,
  podcastSchema,
  dateRangeSchema,
} from "../content.config";

export type About = z.infer<typeof aboutSchema>;
export type SocialMedia = z.infer<typeof socialMediaSchema>;
export type ResumeList = z.infer<typeof resumeListSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type ResumeListElement = z.infer<typeof resumeListElementSchema>;
export type Podcast = z.infer<typeof podcastSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;

export type ProjectEntry = CollectionEntry<"projects">;

/** Validated concert data with parsed calendar dates. */
export type ConcertData = z.infer<typeof concertSchema>;

/** Processed concert with formatted date string */
export type Concert = Omit<ConcertData, "startDate" | "endDate"> & {
  id: number;
  date: string;
};

export type ResumeEntry =
  | CollectionEntry<"experience">
  | CollectionEntry<"education">
  | CollectionEntry<"research">;
