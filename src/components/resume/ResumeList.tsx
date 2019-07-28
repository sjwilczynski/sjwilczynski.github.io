import React from 'react';
import ReactMarkdown from "react-markdown";
import './resume-list.scss'
import {ResumeListData} from "../../data/wrappers/ResumeListData";
import IconWrapper from "../../data/wrappers/IconWrapper";

type ResumeListProps = {
    data: ResumeListData
}

export default function ResumeList(props: ResumeListProps) {

    return (
        <>
            <ul className={"fa-ul mb-0 " + props.data.listClassName}>
                {props.data.elements.map(element => {
                    let icon = element.iconComponentName ? <IconWrapper iconComponentName={element.iconComponentName}
                                                                        iconClassName={(element.iconClassName || "") + ' svg-inline--fa fa-li'}/> : "";
                    let liStyle = element.iconComponentName ? "list-none" : "";
                    return <li className={liStyle} key={element.id}>
                        {icon} <ReactMarkdown source={element.description} renderers={{paragraph: 'span'}}/>
                    </li>
                })}
            </ul>
        </>
    );
}
