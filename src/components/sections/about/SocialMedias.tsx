import * as React from "react";
import medias from "../../../data/social-media.json";
import IconWithLink from "./IconWithLink";
import { SocialMediaData } from "../../../data/wrappers/SocialMediaData";

export default function SocialMedias() {
  const socialMedias = medias.map(
    (socialMediaData: any) => new SocialMediaData(socialMediaData)
  );
  return (
    <div>
      {socialMedias.map((social: SocialMediaData) => (
        <IconWithLink
          key={social.id}
          className={"icon-with-link"}
          iconComponentName={social.iconComponentName}
          link={social.link}
        />
      ))}
    </div>
  );
}
