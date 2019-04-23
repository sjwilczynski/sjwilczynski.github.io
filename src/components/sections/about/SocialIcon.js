import React, {Component} from 'react';

class SocialIcon extends Component {

    render() {
        return (
            <a href={this.props.url}>
                <i className={"fab " + this.props.cssClass}>{this.props.text}</i>
            </a>
        );
    }
}

export default SocialIcon;
