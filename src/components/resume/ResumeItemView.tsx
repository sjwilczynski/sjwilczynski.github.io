import ReactMarkdown from "react-markdown";
import type { ResumeItem } from "@data/types";
import "./resume-item.scss";

export const ResumeItemView = ({
  headings,
  subheading,
  description,
  extraInfos,
}: ResumeItem) => (
  <div className="resume-item d-flex flex-column flex-md-row mb-5">
    <div className="resume-content me-auto">
      {headings.map((heading) => (
        <h3 key={heading} className="mb-0">
          {heading}
        </h3>
      ))}
      <div className="subheading mb-3">{subheading}</div>
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
    <div className="resume-extra text-md-end">
      {extraInfos.map((info) => (
        <span key={info} className="text-primary">
          {info} <br />{" "}
        </span>
      ))}
    </div>
  </div>
);
