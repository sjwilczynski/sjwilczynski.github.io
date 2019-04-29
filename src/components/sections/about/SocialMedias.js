import React, {Component} from 'react';
import medias from "../../../data/social-media"
import IconWithLink from "./IconWithLink";
import './social-icons.css'

class SocialMedias extends Component {

    render() {
        return (
            <div className="social-icons">
                {medias.map(social =>
                    <IconWithLink key={social.id} url={social.link} icon={social.icon}
                                  iconPackage={social.iconPackage}/>
                )}
            </div>
        );
    }
}

export default SocialMedias;
