import React, {Component} from 'react';
import Section from "../sections/Section";
import ReactMarkdown from "react-markdown";

class ResumeList extends Component {

    constructor(props) {
        super(props);
        this.data = props.data.data;
    }

    render() {
        return (
            <>
                <Section id={this.props.id} title={this.props.title}>
                    <ul className={"fa-ul mb-0 " + this.props.data.listStyle}>
                        {this.data.map(element => {
                            let iconBefore = element.iconBefore ? <i className={"fa fa-li " + element.iconBefore}></i> : "";
                            return <li key={element.id}>
                                {iconBefore} <ReactMarkdown source={element.description} rawSourcePos={true}/>
                            </li>
                        })}
                    </ul>
                    {this.props.children}
                </Section>
            </>
        );
    }
}

export default ResumeList;
