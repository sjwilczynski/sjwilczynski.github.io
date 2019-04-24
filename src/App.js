import React, {Component} from 'react';
import Navigation from "./components/navigation/Navigation";
import Head from "./components/head/Head";
import About from "./components/sections/about/About";
import Skills from "./components/sections/skills/Skills";
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

class App extends Component {
    render() {
        return (
            <>
                <Head description={"CV page using React"} data={data}/>
                <Navigation/>
                <div className="container-fluid p-0">
                    <About description="Programmer, student, interested in data science" data={data}/>

                    <ResumeSection id="experience" title="Experience" elements={experienceList}/>

                    <ResumeSection id="education" title="Education" elements={educationList}/>

                    <ResumeSection id="projects" title="Projects & apps">
                        <ResumeList data={projectList}/>
                        <ReactMarkdown source={"More code can be found on my [github](" + data.githubUrl + ")"}/>
                    </ResumeSection>

                    <ResumeSection id="research" title="Research" elements={researchList}/>

                    <Skills data={skillList}/>

                    <ResumeSection id="achievements" title="Achievements & awards">
                        <ResumeList data={achievementList}/>
                    </ResumeSection>

                    <ResumeSection id="interests" title="Interests">
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
