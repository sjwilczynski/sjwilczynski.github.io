import React, {Component} from 'react';
import medias from "../../../data/social-media"
import SocialIcon from "./SocialIcon";

class SocialMedias extends Component {

    render() {
        return (
            <div className="social-icons">
                {medias.map(social =>
                    <SocialIcon key={social.id} url={social.link} cssClass={social.iconClass} text={social.text}/>
                )}
            </div>
        );
    }
}

export default SocialMedias;
