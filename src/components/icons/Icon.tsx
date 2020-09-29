import * as React from "react";
import {
  FaAward,
  FaCheck,
  FaGithub,
  FaGitlab,
  FaGraduationCap,
  FaHeart,
  FaLinkedinIn,
  FaMedal,
  FaStackOverflow,
} from "react-icons/fa";

import "./icon.scss";
import { IconType } from "react-icons";
import { GiFlame } from "react-icons/gi";

type Props = {
  iconComponentName: string;
  iconClassName: string;
};

export default function Icon(props: Props) {
  const iconComponents: { [key: string]: IconType } = {
    FaGithub: FaGithub,
    FaLinkedinIn: FaLinkedinIn,
    FaStackOverflow: FaStackOverflow,
    FaGitlab: FaGitlab,
    FaHeart: FaHeart,
    FaAward: FaAward,
    FaMedal: FaMedal,
    FaGraduationCap: FaGraduationCap,
    FaCheck: FaCheck,
  };

  const IconComponent: IconType =
    iconComponents[props.iconComponentName] || GiFlame;
  return <IconComponent className={props.iconClassName} />;
}
