import type { SocialMedia } from "../../../data/types";
import { IconWithLink } from "../../icons/IconWithLink";

export const SocialMedias = ({
  socialMedias,
}: {
  socialMedias: SocialMedia[];
}) => (
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
