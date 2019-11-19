import React from "react";
import ResumeItem from "./ResumeItem";
import Section from "../sections/Section";
import "./resume-section.scss";
import { ResumeItemData } from "../../data/wrappers/ResumeItemData";

type ResumeSectionProps = {
  id: string;
  title?: string;
  resumeItems?: ResumeItemData[];
  children?: any;
};

export default function ResumeSection(props: ResumeSectionProps) {
  const resumeItems = props.resumeItems || [];
  return (
    <>
      <Section id={props.id} title={props.title}>
        {resumeItems.map(resumeItem => (
          <ResumeItem key={resumeItem.id} data={resumeItem} />
        ))}
        {props.children}
      </Section>
    </>
  );
}
