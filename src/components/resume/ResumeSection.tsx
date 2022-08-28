import { ResumeItemView } from "./ResumeItemView";
import { Section } from "../sections/Section";
import "./resume-section.scss";
import type { ResumeItem } from "@data/types";

type Props = {
  id: string;
  title?: string;
  resumeItems?: ResumeItem[];
  children?: React.ReactNode;
};

export const ResumeSection = ({
  resumeItems = [],
  title,
  id,
  children,
}: Props) => (
  <Section id={id} title={title}>
    {resumeItems.map((resumeItem) => (
      <ResumeItemView key={resumeItem.id} {...resumeItem} />
    ))}
    {children}
  </Section>
);
