import React from 'react';
import {FaGithub, FaGitlab, FaLinkedinIn, FaStackOverflow} from "react-icons/fa";


//TODO: typescript
export default function IconWrapper(props) {
    const iconComponents = {
        'faGithub': FaGithub,
        'faLinkedinIn': FaLinkedinIn,
        'faStackOverflow': FaStackOverflow,
        'faGitlab': FaGitlab
    };

    return React.createElement(iconComponents[props.iconComponentName], {className: props.iconClassName})
}
