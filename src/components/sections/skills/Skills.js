import React, {Component} from 'react';
import Section from "../Section";
import SkillSubsection from "./SkillSubsection";

class Skills extends Component {

    render() {
        return (
            <>
                <Section id="skills" title="Skills">
                    {this.props.data.map(skills =>
                        <SkillSubsection skills={skills}/>
                    )}
                </Section>
            </>
        );
    }
}

export default Skills;
