import { getCollection, getEntry } from "astro:content";
import type { Concert, ResumeList } from "./types";

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
    (a, b) => a.data.sortOrder - b.data.sortOrder,
  );

  const educationResumeItems = (await getCollection("education")).sort(
    (a, b) => a.data.sortOrder - b.data.sortOrder,
  );

  const researchResumeItems = (await getCollection("research")).sort(
    (a, b) => a.data.sortOrder - b.data.sortOrder,
  );

  const projectsEntry = await getEntry("projects", "data");
  if (!projectsEntry) throw new Error("Projects data not found");
  const projectsResumeList: ResumeList = projectsEntry.data;

  const achievementsEntry = await getEntry("achievements", "data");
  if (!achievementsEntry) throw new Error("Achievements data not found");
  const achievementResumeList: ResumeList = achievementsEntry.data;

  const skillsEntries = await getCollection("skills");
  const skillsResumeLists: ResumeList[] = skillsEntries
    .sort((a, b) => Number(a.id) - Number(b.id))
    .map((entry) => entry.data);

  const concertEntries = await getCollection("concerts");
  const concerts: Concert[] = concertEntries
    .sort((a, b) => Number(a.id) - Number(b.id))
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

  return {
    about,
    socialMedias,
    experienceResumeItems,
    educationResumeItems,
    researchResumeItems,
    projectsResumeList,
    achievementResumeList,
    skillsResumeLists,
    concerts,
  };
};

function dateToLocalizedString(date: Date) {
  return date.toLocaleDateString("pl-PL");
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
