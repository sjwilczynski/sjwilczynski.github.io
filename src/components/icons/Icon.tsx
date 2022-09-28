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
} from "react-icons/fa/index";
import "./icon.scss";
import type { IconType } from "react-icons";
import { GiFlame } from "react-icons/gi/index";

type Props = {
  iconName: string;
  iconClassName: string;
};

export const Icon = ({ iconClassName, iconName }: Props) => {
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

  const IconComponent: IconType = iconComponents[iconName] || GiFlame;
  return <IconComponent className={iconClassName} aria-hidden={true} />;
};
