import * as React from "react";
import ReactMarkdown from "react-markdown";
import { ResumeItem } from "../../data/types";
import "./resume-item.scss";

export default function ResumeItemView(props: ResumeItem) {
  const { headings, subheading, description, extraInfos } = props;
  return (
    <>
      <div className="resume-item d-flex flex-column flex-md-row mb-5">
        <div className="resume-content mr-auto">
          {headings.map((heading) => (
            <h3 key={heading} className="mb-0">
              {heading}
            </h3>
          ))}
          <div className="subheading mb-3">{subheading}</div>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
        <div className="resume-extra text-md-right">
          {extraInfos.map((info) => (
            <span key={info} className="text-primary">
              {info} <br />{" "}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
