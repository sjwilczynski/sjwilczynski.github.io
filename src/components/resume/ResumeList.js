import React, {Component} from 'react';
import ReactMarkdown from "react-markdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './resume-list.css'

class ResumeList extends Component {

    constructor(props) {
        super(props);
        this.data = props.data.data;
    }

    render() {
        return (
            <>
                <ul className={"fa-ul mb-0 " + this.props.data.listStyle}>
                    {this.data.map(element => {
                        let icon = element.icon ? <FontAwesomeIcon listItem={true} icon={element.icon} className={element.iconStyle}/> : "";
                        let liStyle = element.icon ? "list-none" : "";
                        return <li className={liStyle} key={element.id}>
                            {icon} <ReactMarkdown source={element.description} renderers={{paragraph: 'span'}}/>
                        </li>
                    })}
                </ul>
            </>
        );
    }
}

export default ResumeList;
