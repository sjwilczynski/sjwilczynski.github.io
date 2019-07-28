import React from 'react';
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

import './icon-wrapper.scss'


//TODO: typescript
export default function IconWrapper(props) {
    const iconComponents = {
        'FaGithub': FaGithub,
        'FaLinkedinIn': FaLinkedinIn,
        'FaStackOverflow': FaStackOverflow,
        'FaGitlab': FaGitlab,
        'FaHeart': FaHeart,
        'FaAward': FaAward,
        'FaMedal': FaMedal,
        'FaGraduationCap': FaGraduationCap,
        'FaCheck': FaCheck
    };

    return React.createElement(iconComponents[props.iconComponentName], {className: props.iconClassName})
}
