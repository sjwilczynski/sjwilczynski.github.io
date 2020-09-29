import * as React from "react";
import ReactMarkdown from "react-markdown";
import "./resume-item.scss";

export type ResumeItemData = {
  id: number;
  headings: string[];
  subheading: string;
  extraInfos: string[];
  description?: string;
};

export default function ResumeItem(props: { data: ResumeItemData }) {
  const itemData = props.data;
  return (
    <>
      <div className="resume-item d-flex flex-column flex-md-row mb-5">
        <div className="resume-content mr-auto">
          {itemData.headings.map((heading) => (
            <h3 key={heading} className="mb-0">
              {heading}
            </h3>
          ))}
          <div className="subheading mb-3">{itemData.subheading}</div>
          <ReactMarkdown source={itemData.description} />
        </div>
        <div className="resume-extra text-md-right">
          {itemData.extraInfos.map((info) => (
            <span key={info} className="text-primary">
              {info} <br />{" "}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
