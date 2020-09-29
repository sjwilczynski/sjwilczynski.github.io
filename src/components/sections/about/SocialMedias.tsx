import * as React from "react";
import medias from "../../../data/social-media.json";
import IconWithLink from "../../icons/IconWithLink";

type SocialMedia = {
  id: number;
  link: string;
  iconComponentName: string;
  title: string;
};

export default function SocialMedias() {
  const socialMedias = (medias as unknown) as SocialMedia[];
  return (
    <div>
      {socialMedias.map((social: SocialMedia) => (
        <IconWithLink
          key={social.id}
          iconComponentName={social.iconComponentName}
          link={social.link}
          title={social.title}
        />
      ))}
    </div>
  );
}
