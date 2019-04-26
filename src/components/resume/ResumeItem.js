import React, {Component} from 'react';
import ReactMarkdown from "react-markdown";

class ResumeItem extends Component {

    constructor(props) {
        super(props);
        this.element = props.element;
    }

    render() {
        return (
            <>
                <div className="resume-item d-flex flex-column flex-md-row mb-5">
                    <div className="resume-content mr-auto">
                        {this.element.headings.map(heading =>
                            <h3 key={heading} className="mb-0">{heading}</h3>
                        )}
                        <div className="subheading mb-3">{this.element.subheading}</div>
                        <ReactMarkdown source={this.element.description}/>
                    </div>
                    <div className="resume-date text-md-right">
                        {this.element.rightInfos.map(info =>
                            <span key={info} className="text-primary">{info} <br/> </span>)}
                    </div>
                </div>
            </>
        );
    }
}

export default ResumeItem;
