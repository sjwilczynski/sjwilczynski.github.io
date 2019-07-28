import React from 'react';
import Navigation from "./components/navigation/Navigation";
import Head from "./components/head/Head";
import About from "./components/sections/about/About";
import ResumeList from "./components/resume/ResumeList";
import ResumeSection from "./components/resume/ResumeSection";
import Skills from "./components/sections/skills/Skills";
import Interests from "./components/sections/interests/Interests";

import achievementListData from "./data/achievements.json";
import projectListData from "./data/projects.json";
import experienceListData from "./data/experience.json";
import educationListData from "./data/education.json"
import researchListData from "./data/reasearch.json"
import skillListData from "./data/skills.json"
import aboutData from "./data/about.json";

import './fontawesome/fontawesome';
import 'bootstrap/dist/js/bootstrap'
import "./resume.scss"
import ReactMarkdown from "react-markdown";
import {AboutData} from './data/wrappers/AboutData';

export default function App() {
    let sections = {
        about: "About",
        experience: "Experience",
        education: "Education",
        projects: "Projects & apps",
        research: "Research",
        skills: "Skills",
        achievements: "Achievements",
        interests: "Interests"
    };
    let about: AboutData = new AboutData(aboutData);
    return (
        <>
            <Head description={"CV page using React"} data={about.getFullName()}/>
            <Navigation sections={sections} fullname={about.getFullName()}/>
            <div className="container-fluid p-0">

                <ResumeSection id="about">
                    <About data={about}/>
                </ResumeSection>

                <ResumeSection id="experience" title={sections.experience} elements={experienceListData}/>

                <ResumeSection id="education" title={sections.education} elements={educationListData}/>

                <ResumeSection id="projects" title={sections.projects}>
                    <ResumeList data={projectListData}/>
                    <ReactMarkdown source={"More code can be found on my [github](" + about.githubUrl + ")"}/>
                </ResumeSection>

                <ResumeSection id="research" title={sections.research} elements={researchListData}/>

                <ResumeSection id="skills" title={sections.skills}>
                    {skillListData.map(skills =>
                        <Skills key={skills.id} skills={skills}/>
                    )}
                </ResumeSection>

                <ResumeSection id="achievements" title={sections.achievements}>
                    <ResumeList data={achievementListData}/>
                </ResumeSection>

                <ResumeSection id="interests" title={sections.interests}>
                    <Interests/>
                </ResumeSection>
            </div>
        </>
    );
}

