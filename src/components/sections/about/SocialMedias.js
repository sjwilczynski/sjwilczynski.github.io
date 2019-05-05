import React, {Component} from 'react';
import medias from "../../../data/social-media"
import IconWithLink from "./IconWithLink";

class SocialMedias extends Component {

    render() {
        return (
            <div>
                {medias.map(social =>
                    <IconWithLink className={"icon-with-link"} key={social.id} url={social.link} icon={social.icon}
                                  iconPackage={social.iconPackage}/>
                )}
            </div>
        );
    }
}

export default SocialMedias;
