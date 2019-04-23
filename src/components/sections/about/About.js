import React, {Component} from 'react';
import Section from "../Section";
import data from "../../../data/basic-data";
import SocialMedias from "./SocialMedias";

class About extends Component {

    render() {
        return (
            <>
                <Section id="about">
                    <h1 className="mb-0">{data.name}
                        <span className="text-primary"> {data.surname}</span>
                    </h1>
                    <div className="subheading mb-5">{data.city}, {data.country},
                        <a href={"mailto:" + data.email}>{data.email}</a>
                    </div>
                    <p className="lead mb-5">{this.props.description}</p>
                    <SocialMedias/>
                </Section>
            </>
        );
    }
}

export default About;
