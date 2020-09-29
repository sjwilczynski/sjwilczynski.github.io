import * as React from "react";
import ReactMarkdown from "react-markdown";
import Icon from "../icons/Icon";
import "./resume-list.scss";

export type ResumeListElementData = {
  id: number;
  description: string;
  iconComponentName?: string;
  iconClassName?: string;
};

export type ResumeListData = {
  elements: ResumeListElementData[];
  id?: number;
  title?: string;
  listClassName?: string;
  numColumns?: number;
};

export default function ResumeList(props: { data: ResumeListData }) {
  return (
    <>
      <ul className={"fa-ul mb-0 " + props.data.listClassName}>
        {props.data.elements.map((element) => {
          let icon = element.iconComponentName ? (
            <Icon
              iconComponentName={element.iconComponentName}
              iconClassName={
                (element.iconClassName || "") + " svg-inline--fa fa-li"
              }
            />
          ) : (
            ""
          );
          let liStyle = element.iconComponentName ? "list-none" : "";
          return (
            <li className={liStyle} key={element.id}>
              {icon}{" "}
              <ReactMarkdown
                source={element.description}
                renderers={{ paragraph: "span" }}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
