import * as React from "react";
import ResumeItemView from "./ResumeItemView";
import Section from "../sections/Section";
import "./resume-section.scss";
import { ResumeItem } from "../../data/types";

type Props = {
  id: string;
  title?: string;
  resumeItems?: ResumeItem[];
  children?: React.ReactNode;
};

export default function ResumeSection(props: Props) {
  const resumeItems = props.resumeItems || [];
  return (
    <>
      <Section id={props.id} title={props.title}>
        {resumeItems.map((resumeItem) => (
          <ResumeItemView key={resumeItem.id} {...resumeItem} />
        ))}
        {props.children}
      </Section>
    </>
  );
}
