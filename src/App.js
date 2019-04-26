import React, {Component} from 'react';
import Navigation from "./components/navigation/Navigation";
import Head from "./components/head/Head";
import About from "./components/sections/about/About";
import achievementList from "./data/achivements";
import projectList from "./data/projects";
import interests from "./data/interests";
import data from "./data/basic-data"
import ResumeList from "./components/resume/ResumeList";
import ReactMarkdown from "react-markdown/with-html";
import experienceList from "./data/experience";
import educationList from "./data/education"
import researchList from "./data/reasearch"
import skillList from "./data/skills"
import ResumeSection from "./components/resume/ResumeSection";
import SkillSubsection from "./components/sections/skills/SkillSubsection";

import 'bootstrap/dist/css/bootstrap.css';
import "./resume.css"

class App extends Component {
    render() {
        let sections = {
            about : "About",
            experience : "Experience",
            education : "Education",
            projects : "Projects & apps",
            research : "Research",
            skills: "Skills",
            achievements: "Achievements",
            interests: "Interests"
        };
        return (
            <>
                <Head description={"CV page using React"} data={data}/>
                <Navigation sections={sections}/>
                <div className="container-fluid p-0">
                    <About description="Programmer, student, interested in data science" data={data} id="about"/>

                    <ResumeSection id="experience" title={sections.experience} elements={experienceList}/>

                    <ResumeSection id="education" title={sections.education} elements={educationList}/>

                    <ResumeSection id="projects" title={sections.projects}>
                        <ResumeList data={projectList}/>
                        <ReactMarkdown source={"More code can be found on my [github](" + data.githubUrl + ")"}/>
                    </ResumeSection>

                    <ResumeSection id="research" title={sections.research} elements={researchList}/>

                    <ResumeSection id="skills" title={sections.skills}>
                        {skillList.map(skills =>
                            <SkillSubsection key={skills.id} skills={skills}/>
                        )}
                    </ResumeSection>

                    <ResumeSection id="achievements" title={sections.achievements}>
                        <ResumeList data={achievementList}/>
                    </ResumeSection>

                    <ResumeSection id="interests" title={sections.interests}>
                        {interests.map(interest =>
                            <ReactMarkdown key={interest.id} source={interest.description} escapeHtml={false}/>
                        )}
                    </ResumeSection>
                </div>
            </>
        );
    }
}

export default App;
