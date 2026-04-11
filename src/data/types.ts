import type { CollectionEntry } from "astro:content";

export type About = {
  name: string;
  surname: string;
  city: string;
  country: string;
  email: string;
  githubUrl: string;
  introduction: string;
};

export type ResumeListElement = {
  id: number;
  description: string;
  iconName?: string | undefined;
  iconClassName?: string | undefined;
};

export type ResumeList = {
  elements: ResumeListElement[];
  id?: number | undefined;
  title?: string | undefined;
  numColumns?: number | undefined;
};

export type SocialMedia = {
  id: string;
  link: string;
  iconName: string;
  title: string;
};

export type Concert = {
  id: number;
  date: string;
  title: string;
  location: string;
  description: string;
};

export type ResumeEntry =
  | CollectionEntry<"experience">
  | CollectionEntry<"education">
  | CollectionEntry<"research">;
