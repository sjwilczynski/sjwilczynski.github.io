import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './icons.scss'

export default function IconWithLink(props) {

    return (
        <a href={props.url} className={props.className}>
            <FontAwesomeIcon icon={[props.iconPackage, props.icon]}/>
        </a>
    );
}
