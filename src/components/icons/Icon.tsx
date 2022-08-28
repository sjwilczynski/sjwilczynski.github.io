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
  iconComponentName: string;
  iconClassName: string;
};

export const Icon = ({ iconClassName, iconComponentName }: Props) => {
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

  const IconComponent: IconType = iconComponents[iconComponentName] || GiFlame;
  return <IconComponent className={iconClassName} aria-hidden={true} />;
};
