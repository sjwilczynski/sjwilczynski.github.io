import React from 'react';
import ReactMarkdown from "react-markdown";
import './resume-item.css'

export default function ResumeItem(props) {

    const element = props.element;
    return (
        <>
            <div className="resume-item d-flex flex-column flex-md-row mb-5">
                <div className="resume-content mr-auto">
                    {element.headings.map(heading =>
                        <h3 key={heading} className="mb-0">{heading}</h3>
                    )}
                    <div className="subheading mb-3">{element.subheading}</div>
                    <ReactMarkdown source={element.description}/>
                </div>
                <div className="resume-extra text-md-right">
                    {element.extraInfos.map(info =>
                        <span key={info} className="text-primary">{info} <br/> </span>)}
                </div>
            </div>
        </>
    )
}
