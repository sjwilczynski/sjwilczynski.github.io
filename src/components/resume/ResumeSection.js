import React, {Component} from 'react';
import ResumeElement from "./ResumeElement";
import Section from "../sections/Section";

class ResumeSection extends Component {
    render() {
        let elements = this.props.elements ? this.props.elements : [];
        return (
            <>
                <Section id={this.props.id} title={this.props.title}>
                    {elements.map(element =>
                        <ResumeElement key={element.id} element={element}/>
                    )}
                    {this.props.children}
                </Section>
            </>
        );
    }
}

export default ResumeSection;
