import "./icon-wth-link.scss";
import { Icon } from "./Icon";

type Props = {
  iconComponentName: string;
  link: string;
  title: string;
};

export const IconWithLink = ({ iconComponentName, link, title }: Props) => (
  <a href={link} className={"icon-with-link"} title={title} aria-label={title}>
    <Icon
      iconComponentName={iconComponentName}
      iconClassName={"svg-inline--fa"}
    />
  </a>
);
