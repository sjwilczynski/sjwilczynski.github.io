import "./icon-wth-link.scss";
import { Icon } from "./Icon";

type Props = {
  iconName: string;
  link: string;
  title: string;
};

export const IconWithLink = ({ iconName, link, title }: Props) => (
  <a href={link} className={"icon-with-link"} title={title} aria-label={title}>
    <Icon
      iconName={iconName}
      iconClassName={"svg-inline--fa"}
    />
  </a>
);
