import React from "react";
import "./icons.scss";
import IconWrapper from "../../../data/wrappers/IconWrapper";

type IconWithLinkProps = {
  className: string;
  iconComponentName: string;
  link: string;
};

export default function IconWithLink(props: IconWithLinkProps) {
  return (
    <a href={props.link} className={props.className}>
      <IconWrapper
        iconComponentName={props.iconComponentName}
        iconClassName={"svg-inline--fa"}
      />
    </a>
  );
}
