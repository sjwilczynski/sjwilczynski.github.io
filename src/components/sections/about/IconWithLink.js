import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './icons.css'

class IconWithLink extends Component {

    render() {
        return (
            <a href={this.props.url} className={this.props.className}>
                <FontAwesomeIcon icon={[this.props.iconPackage, this.props.icon]} />
            </a>
        );
    }
}

export default IconWithLink;
