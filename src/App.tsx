import * as React from "react";
import Navigation from "./components/navigation/Navigation";
import Head from "./components/head/Head";
import AboutSection from "./components/sections/about/AboutSection";
import ResumeListView from "./components/resume/ResumeListView";
import ResumeSection from "./components/resume/ResumeSection";
import Skills from "./components/sections/skills/Skills";
import Interests from "./components/sections/interests/Interests";

import "bootstrap/dist/js/bootstrap";
import "./resume.scss";
import ReactMarkdown from "react-markdown";
import { getData } from "./data/getData";

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

  const {
    about,
    experienceResumeItems,
    educationResumeItems,
    researchResumeItems,
    projectsResumeList,
    achievementResumeList,
    skillsResumeLists,
    socialMedias,
    concerts,
  } = getData();

  const fullName = about.name + " " + about.surname;

  return (
    <>
      <Head description={"CV page using React"} fullName={fullName}>
        <title>{fullName}</title>
      </Head>
      <Navigation sections={sections} fullName={fullName} />
      <div className="container-fluid p-0">
        <ResumeSection id="about">
          <AboutSection about={about} socialMedias={socialMedias} />
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
          <ResumeListView {...projectsResumeList} />
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
          <ResumeListView {...achievementResumeList} />
        </ResumeSection>

        <ResumeSection id="interests" title={sections.interests}>
          <Interests concerts={concerts} />
        </ResumeSection>
      </div>
    </>
  );
}
