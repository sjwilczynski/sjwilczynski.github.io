import * as React from "react";
import { SocialMedia } from "../../../data/types";
import IconWithLink from "../../icons/IconWithLink";

export default function SocialMedias(props: { socialMedias: SocialMedia[] }) {
  return (
    <div>
      {props.socialMedias.map((social: SocialMedia) => (
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
