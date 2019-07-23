import React, {Component} from 'react';
import Navigation from "./components/navigation/Navigation";
import Head from "./components/head/Head";
import About from "./components/sections/about/About";
import ResumeList from "./components/resume/ResumeList";
import ReactMarkdown from "react-markdown/with-html";
import ResumeSection from "./components/resume/ResumeSection";
import Skills from "./components/sections/skills/Skills";
import Interests from "./components/sections/interests/Interests";

import achievementList from "./data/achievements";
import projectList from "./data/projects";
import experienceList from "./data/experience";
import educationList from "./data/education"
import researchList from "./data/reasearch"
import skillList from "./data/skills"
import about from "./data/about";

import './fontawesome/fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'
import "./resume.css"

class App extends Component {
    render() {
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
        return (
            <>
                <Head description={"CV page using React"} data={about.fullname}/>
                <Navigation sections={sections} fullname={about.fullname}/>
                <div className="container-fluid p-0">

                    <ResumeSection id="about">
                        <About data={about}/>
                    </ResumeSection>

                    <ResumeSection id="experience" title={sections.experience} elements={experienceList}/>

                    <ResumeSection id="education" title={sections.education} elements={educationList}/>

                    <ResumeSection id="projects" title={sections.projects}>
                        <ResumeList data={projectList}/>
                        <ReactMarkdown source={"More code can be found on my [github](" + about.githubUrl + ")"}/>
                    </ResumeSection>

                    <ResumeSection id="research" title={sections.research} elements={researchList}/>

                    <ResumeSection id="skills" title={sections.skills}>
                        {skillList.map(skills =>
                            <Skills key={skills.id} skills={skills}/>
                        )}
                    </ResumeSection>

                    <ResumeSection id="achievements" title={sections.achievements}>
                        <ResumeList data={achievementList}/>
                    </ResumeSection>

                    <ResumeSection id="interests" title={sections.interests}>
                        <Interests/>
                    </ResumeSection>
                </div>
            </>
        );
    }
}

export default App;
