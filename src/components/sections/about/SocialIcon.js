import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class SocialIcon extends Component {

    render() {
        return (
            <a href={this.props.url}>
                <FontAwesomeIcon icon={[this.props.iconPackage, this.props.icon]} >
                    {this.props.icon}
                </FontAwesomeIcon>
            </a>
        );
    }
}

export default SocialIcon;
