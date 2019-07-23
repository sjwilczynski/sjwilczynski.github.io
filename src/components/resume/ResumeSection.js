import React from 'react';
import ResumeItem from "./ResumeItem";
import Section from "../sections/Section";
import './resume-section.css'

export default function ResumeSection(props) {
    const elements = props.elements || [];
    return (
        <>
            <Section id={props.id} title={props.title}>
                {elements.map(element =>
                    <ResumeItem key={element.id} element={element}/>
                )}
                {props.children}
            </Section>
        </>
    )
}
