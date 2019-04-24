import React, {Component} from 'react';
import ResumeElement from "./ResumeElement";
import Section from "../sections/Section";

class ResumeSection extends Component {
    render() {
        return (
            <>
                <Section id={this.props.id} title={this.props.title}>
                    {this.props.elements.map(element =>
                        <ResumeElement key={element.id} element={element}/>
                    )}
                </Section>
            </>
        );
    }
}

export default ResumeSection;
