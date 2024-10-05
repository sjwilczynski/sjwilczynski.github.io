import achievementListData from "./jsons/achievements.json";
import projectListData from "./jsons/projects.json";
import experienceListData from "./jsons/experience.json";
import educationListData from "./jsons/education.json";
import researchListData from "./jsons/reasearch.json";
import skillListData from "./jsons/skills.json";
import aboutData from "./jsons/about.json";
import socialMedia from "./jsons/social-media.json";
import concertsData from "./jsons/concerts.json";
import type {
  About,
  Concert,
  ResumeItem,
  ResumeList,
  SocialMedia,
} from "./types";

export const getData = () => {
  const about = aboutData as unknown as About;
  const socialMedias = socialMedia as unknown as SocialMedia[];

  const experienceResumeItems = experienceListData as unknown as ResumeItem[];
  const educationResumeItems = educationListData as unknown as ResumeItem[];
  const researchResumeItems = researchListData as unknown as ResumeItem[];

  const projectsResumeList = projectListData as unknown as ResumeList;
  const achievementResumeList = achievementListData as unknown as ResumeList;
  const skillsResumeLists = skillListData as unknown as ResumeList[];

  const concerts: Concert[] = concertsData
    .map((data) => {
      return {
        id: data.id,
        date: getConcertDate(
          readDateFromString(data.startDate),
          readDateFromString(data.endDate),
        ),
        title: data.title,
        location: data.location,
        description: data.description,
      };
    })
    .reverse();

  return {
    about,
    experienceResumeItems,
    educationResumeItems,
    researchResumeItems,
    projectsResumeList,
    achievementResumeList,
    skillsResumeLists,
    socialMedias,
    concerts,
  };
};

function dateToLocalizedString(date: Date) {
  return date.toLocaleDateString("pl-PL");
}
function readDateFromString(date: string) {
  const [year, month, day] = date.split(".").map((part) => parseInt(part));
  return year !== undefined && month !== undefined && day !== undefined
    ? new Date(year, month - 1, day)
    : new Date();
}

function getConcertDate(startDate: Date, endDate: Date): string {
  return startDate.getTime() === endDate.getTime()
    ? dateToLocalizedString(startDate)
    : dateToLocalizedString(startDate) + " - " + dateToLocalizedString(endDate);
}
