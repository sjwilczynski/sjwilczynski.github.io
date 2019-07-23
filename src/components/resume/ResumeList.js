import React from 'react';
import ReactMarkdown from "react-markdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './resume-list.css'

export default function ResumeList(props) {

    return (
        <>
            <ul className={"fa-ul mb-0 " + props.data.listStyle}>
                {props.data.elements.map(element => {
                    let icon = element.icon ?
                        <FontAwesomeIcon listItem={true} icon={element.icon} className={element.iconStyle}/> : "";
                    let liStyle = element.icon ? "list-none" : "";
                    return <li className={liStyle} key={element.id}>
                        {icon} <ReactMarkdown source={element.description} renderers={{paragraph: 'span'}}/>
                    </li>
                })}
            </ul>
        </>
    );
}
