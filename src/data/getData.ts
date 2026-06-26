import { getCollection, getEntry } from "astro:content";
import type { Concert, Podcast, ResumeList } from "./types";

// Concert dates are formatted to match the page language (<html lang="en">).
const DATE_LOCALE = "en-GB";

const bySortOrder = (
  a: { data: { sortOrder: number } },
  b: { data: { sortOrder: number } },
) => a.data.sortOrder - b.data.sortOrder;

const byNumericId = (a: { id: string }, b: { id: string }) =>
  Number(a.id) - Number(b.id);

export const getData = async () => {
  const aboutEntry = await getEntry("about", "main");
  if (!aboutEntry) throw new Error("About data not found");
  const about = aboutEntry.data;

  const socialMediaEntries = await getCollection("social-media");
  const socialMedias = socialMediaEntries.map((entry) => ({
    id: entry.id,
    ...entry.data,
  }));

  const experienceResumeItems = (await getCollection("experience")).sort(
    bySortOrder,
  );

  const educationResumeItems = (await getCollection("education")).sort(
    bySortOrder,
  );

  const researchResumeItems = (await getCollection("research")).sort(
    bySortOrder,
  );

  const projectEntries = (await getCollection("projects")).sort(bySortOrder);

  const achievementsEntry = await getEntry("achievements", "data");
  if (!achievementsEntry) throw new Error("Achievements data not found");
  const achievementResumeList: ResumeList = achievementsEntry.data;

  const skillsEntries = await getCollection("skills");
  const skillsResumeLists: ResumeList[] = skillsEntries
    .sort(byNumericId)
    .map((entry) => entry.data);

  const concertEntries = await getCollection("concerts");
  const concerts: Concert[] = concertEntries
    .sort(byNumericId)
    .map((entry) => ({
      id: Number(entry.id),
      date: getConcertDate(
        readDateFromString(entry.data.startDate),
        readDateFromString(entry.data.endDate),
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

function dateToLocalizedString(date: Date) {
  return date.toLocaleDateString(DATE_LOCALE);
}
function readDateFromString(date: string) {
  const [day, month, year] = date.split(".").map((part) => parseInt(part));
  return year !== undefined && month !== undefined && day !== undefined
    ? new Date(year, month - 1, day)
    : new Date();
}

function getConcertDate(startDate: Date, endDate: Date): string {
  return startDate.getTime() === endDate.getTime()
    ? dateToLocalizedString(startDate)
    : dateToLocalizedString(startDate) + " - " + dateToLocalizedString(endDate);
}
