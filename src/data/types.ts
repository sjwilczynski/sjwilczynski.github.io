import type { z } from "astro/zod";
import type { CollectionEntry } from "astro:content";
import type {
  aboutSchema,
  socialMediaSchema,
  resumeListSchema,
  resumeListElementSchema,
  concertSchema,
} from "../content.config";

export type About = z.infer<typeof aboutSchema>;
export type SocialMedia = z.infer<typeof socialMediaSchema>;
export type ResumeList = z.infer<typeof resumeListSchema>;
export type ResumeListElement = z.infer<typeof resumeListElementSchema>;

/** Raw concert data from content collection */
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
