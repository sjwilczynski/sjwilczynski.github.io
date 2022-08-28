import ReactMarkdown from "react-markdown";
import type { ResumeList } from "../../data/types";
import { Icon } from "../icons/Icon";
import "./resume-list.scss";

export const ResumeListView = ({ elements, listClassName }: ResumeList) => (
  <ul className={"fa-ul mb-0 " + listClassName}>
    {elements.map((element) => {
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
            components={{ p: ({ node, ...props }) => <span {...props} /> }}
          >
            {element.description}
          </ReactMarkdown>
        </li>
      );
    })}
  </ul>
);
