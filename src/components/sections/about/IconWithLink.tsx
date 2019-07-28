import React from 'react';
import './icons.scss'
import IconWrapper from "../../../data/wrappers/IconWrapper";

type  IconWithLinkProps = {
    className: string,
    iconName: string,
    link: string
}

export default function IconWithLink(props: IconWithLinkProps) {

    return (
        <a href={props.link} className={props.className}>
            <IconWrapper iconComponentName={props.iconName} iconClassName={'svg-inline--fa'}/>
        </a>
    );
}
