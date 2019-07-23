import React, {Component} from 'react';
import ResumeItem from "./ResumeItem";
import Section from "../sections/Section";
import './resume-section.css'

class ResumeSection extends Component {
    render() {
        const elements = this.props.elements || [];
        return (
            <>
                <Section id={this.props.id} title={this.props.title}>
                    {elements.map(element =>
                        <ResumeItem key={element.id} element={element}/>
                    )}
                    {this.props.children}
                </Section>
            </>
        );
    }
}

export default ResumeSection;
