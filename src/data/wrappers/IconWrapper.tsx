import React from "react";
import {
  FaAward,
  FaCheck,
  FaGithub,
  FaGitlab,
  FaGraduationCap,
  FaHeart,
  FaLinkedinIn,
  FaMedal,
  FaStackOverflow
} from "react-icons/fa";

import "./icon-wrapper.scss";
import { IconType } from "react-icons";
import { GiFlame } from "react-icons/gi";

type IconWrapperProps = {
  iconComponentName: string;
  iconClassName: string;
};

export default function IconWrapper(props: IconWrapperProps) {
  const iconComponents: Map<string, IconType> = new Map<string, IconType>([
    ["FaGithub", FaGithub],
    ["FaLinkedinIn", FaLinkedinIn],
    ["FaStackOverflow", FaStackOverflow],
    ["FaGitlab", FaGitlab],
    ["FaHeart", FaHeart],
    ["FaAward", FaAward],
    ["FaMedal", FaMedal],
    ["FaGraduationCap", FaGraduationCap],
    ["FaCheck", FaCheck]
  ]);

  const iconComponent: IconType =
    iconComponents.get(props.iconComponentName) || GiFlame;
  return React.createElement(iconComponent, { className: props.iconClassName });
}
