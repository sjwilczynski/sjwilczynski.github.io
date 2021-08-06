import ReactMarkdown from "react-markdown";
import { ResumeList } from "../../data/types";
import Icon from "../icons/Icon";
import "./resume-list.scss";

export default function ResumeListView(props: ResumeList) {
  return (
    <>
      <ul className={"fa-ul mb-0 " + props.listClassName}>
        {props.elements.map((element) => {
          const icon = element.iconComponentName ? (
            <Icon
              iconComponentName={element.iconComponentName}
              iconClassName={
                (element.iconClassName || "") + " svg-inline--fa fa-li"
              }
            />
          ) : (
            ""
          );
          const liStyle = element.iconComponentName ? "list-none" : "";
          return (
            <li className={liStyle} key={element.id}>
              {icon}{" "}
              <ReactMarkdown
                components={{ p: ({node, ...props}) => <span {...props} /> }}
              >
              {element.description}
              </ReactMarkdown>
            </li>
          );
        })}
      </ul>
    </>
  );
}
