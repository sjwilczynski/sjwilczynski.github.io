import React, {Component} from 'react';

class ExperienceElement extends Component {

    constructor(props) {
        super(props);
        this.experience = props.experience;

    }

    render() {
        return (
            <>
                <div className="resume-item d-flex flex-column flex-md-row mb-5">
                    <div className="resume-content mr-auto">
                        {this.experience.positions.map(position =>
                            <h3 className="mb-0">{position}</h3>
                        )}
                        <div className="subheading mb-3">{this.experience.company}</div>
                        <p>{this.experience.description}</p>
                    </div>
                    <div className="resume-date text-md-right">
                        {this.experience.dates.map(date =>
                        <span className="text-primary">{date} <br/> </span>)}
                    </div>
                </div>
            </>
        );
    }
}

export default ExperienceElement;
