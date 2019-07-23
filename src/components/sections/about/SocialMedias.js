import React from 'react';
import medias from "../../../data/social-media"
import IconWithLink from "./IconWithLink";

export default function SocialMedias() {
    return (
        <div>
            {medias.map(social =>
                <IconWithLink className={"icon-with-link"} key={social.id} url={social.link} icon={social.icon}
                              iconPackage={social.iconPackage}/>
            )}
        </div>
    );
}
