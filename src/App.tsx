import * as React from "react";
import Navigation from "./components/navigation/Navigation";
import Head from "./components/head/Head";
import About from "./components/sections/about/About";
import ResumeList, { ResumeListData } from "./components/resume/ResumeList";
import ResumeSection from "./components/resume/ResumeSection";
import Skills from "./components/sections/skills/Skills";
import Interests from "./components/sections/interests/Interests";

import achievementListData from "./data/achievements.json";
import projectListData from "./data/projects.json";
import experienceListData from "./data/experience.json";
import educationListData from "./data/education.json";
import researchListData from "./data/reasearch.json";
import skillListData from "./data/skills.json";
import aboutData from "./data/about.json";

import "bootstrap/dist/js/bootstrap";
import "./resume.scss";
import ReactMarkdown from "react-markdown";
import { AboutData } from "./data/wrappers/AboutData";
import { ResumeItemData } from "./components/resume/ResumeItem";

export type Sections = {
  [key: string]: string;
};

export default function App() {
  const sections: Sections = {
    about: "About",
    experience: "Experience",
    education: "Education",
    projects: "Projects & apps",
    research: "Research",
    skills: "Skills",
    achievements: "Achievements",
    interests: "Interests",
  };
  const about: AboutData = new AboutData(aboutData);

  const experienceResumeItems = (experienceListData as unknown) as ResumeItemData[];
  const educationResumeItems = (educationListData as unknown) as ResumeItemData[];
  const researchResumeItems = (researchListData as unknown) as ResumeItemData[];

  const projectsResumeList = (projectListData as unknown) as ResumeListData;
  const achievementResumeList = (achievementListData as unknown) as ResumeListData;
  const skillsResumeLists = (skillListData as unknown) as ResumeListData[];

  return (
    <>
      <Head description={"CV page using React"} fullName={about.getFullName()}>
        <title>{about.getFullName()}</title>
      </Head>
      <Navigation sections={sections} fullName={about.getFullName()} />
      <div className="container-fluid p-0">
        <ResumeSection id="about">
          <About data={about} />
        </ResumeSection>

        <ResumeSection
          id="experience"
          title={sections.experience}
          resumeItems={experienceResumeItems}
        />

        <ResumeSection
          id="education"
          title={sections.education}
          resumeItems={educationResumeItems}
        />

        <ResumeSection id="projects" title={sections.projects}>
          <ResumeList data={projectsResumeList} />
          <ReactMarkdown
            source={
              "More code can be found on my [github](" + about.githubUrl + ")"
            }
          />
        </ResumeSection>

        <ResumeSection
          id="research"
          title={sections.research}
          resumeItems={researchResumeItems}
        />

        <ResumeSection id="skills" title={sections.skills}>
          {skillsResumeLists.map((skills) => (
            <Skills key={skills.id} skills={skills} />
          ))}
        </ResumeSection>

        <ResumeSection id="achievements" title={sections.achievements}>
          <ResumeList data={achievementResumeList} />
        </ResumeSection>

        <ResumeSection id="interests" title={sections.interests}>
          <Interests />
        </ResumeSection>
      </div>
    </>
  );
}
