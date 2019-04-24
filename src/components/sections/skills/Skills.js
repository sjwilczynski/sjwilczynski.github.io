import React, {Component} from 'react';
import skillList from "../../../data/skills";
import Section from "../Section";
import SkillSubsection from "./SkillSubsection";

class Skills extends Component {

    render() {
        return (
            <>
                <Section id="skills" title="Skills">
                    {skillList.map(skillSubsection =>
                        <SkillSubsection skills={skillSubsection}/>
                    )}
                </Section>
            </>
        );
    }
}

export default Skills;
