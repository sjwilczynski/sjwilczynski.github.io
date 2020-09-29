import * as React from "react";
import "./icon-wth-link.scss";
import Icon from "./Icon";

type IconWithLinkProps = {
  iconComponentName: string;
  link: string;
  title: string;
};

export default function IconWithLink(props: IconWithLinkProps) {
  const { iconComponentName, link, title } = props;
  return (
    <a
      href={link}
      className={"icon-with-link"}
      title={title}
      aria-label={title}
    >
      <Icon
        iconComponentName={iconComponentName}
        iconClassName={"svg-inline--fa"}
      />
    </a>
  );
}
