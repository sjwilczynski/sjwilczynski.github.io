import React, {Component} from 'react';
import ReactMarkdown from "react-markdown";

class ResumeElement extends Component {

    constructor(props) {
        super(props);
        this.element = props.element;

    }

    render() {
        return (
            <>
                <div className="resume-item d-flex flex-column flex-md-row mb-5">
                    <div className="resume-content mr-auto">
                        {this.element.positions.map(position =>
                            <h3 className="mb-0">{position}</h3>
                        )}
                        <div className="subheading mb-3">{this.element.company}</div>
                        <ReactMarkdown source={this.element.description}/>
                    </div>
                    <div className="resume-date text-md-right">
                        {this.element.dates.map(date =>
                            <span className="text-primary">{date} <br/> </span>)}
                    </div>
                </div>
            </>
        );
    }
}

export default ResumeElement;
