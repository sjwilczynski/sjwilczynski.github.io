import React, {Component} from 'react';
import SocialMedias from "./SocialMedias";

class About extends Component {

    render() {
        return (
            <>
                <h1 className="mb-0">{this.props.data.name}
                    <span className="text-primary"> {this.props.data.surname}</span>
                </h1>
                <div className="subheading mb-5">{this.props.data.city}, {this.props.data.country},
                    <a href={"mailto:" + this.props.data.email}>  {this.props.data.email}</a>
                </div>
                <p className="lead mb-5">{this.props.description}</p>
                <SocialMedias/>
            </>
        );
    }
}

export default About;
