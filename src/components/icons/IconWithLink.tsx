import * as React from "react";
import "./icon-wth-link.scss";
import Icon from "./Icon";

type IconWithLinkProps = {
  iconComponentName: string;
  link: string;
  title: string;
};

export default function IconWithLink(props: IconWithLinkProps) {
  return (
    <a
      href={props.link}
      className={"icon-with-link"}
      title={props.title}
      aria-hidden={true}
    >
      <Icon
        iconComponentName={props.iconComponentName}
        iconClassName={"svg-inline--fa"}
      />
      <span className={"hidden"}></span>
    </a>
  );
}
