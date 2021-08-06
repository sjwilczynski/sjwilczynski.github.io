import SocialMedias from "./SocialMedias";
import ReactMarkdown from "react-markdown";
import { About, SocialMedia } from "../../../data/types";

export default function AboutSection(props: {
  about: About;
  socialMedias: SocialMedia[];
}) {
  const { about, socialMedias } = props;
  return (
    <>
      <h1 className="mb-0">
        {about.name}
        <span className="text-primary"> {about.surname}</span>
      </h1>
      <div className="subheading mb-5">
        {about.city}, {about.country},
        <a href={"mailto:" + about.email}> {about.email}</a>
      </div>
      <ReactMarkdown className="lead mb-5">
        {about.introduction} 
      </ReactMarkdown>
      <SocialMedias socialMedias={socialMedias} />
    </>
  );
}
