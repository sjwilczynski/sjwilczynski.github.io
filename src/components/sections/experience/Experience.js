import React, {Component} from 'react';
import experienceList from "../../../data/experience";
import Section from "../Section";
import ExperienceElement from "./ExperienceElement";

class Experience extends Component {

    render() {
        return (
            <>
                <Section id="experience" title="Experience">
                    {experienceList.map(experience =>
                        <ExperienceElement key={experience.id} experience={experience}/>
                    )}
                </Section>
            </>
        );
    }
}

export default Experience;
