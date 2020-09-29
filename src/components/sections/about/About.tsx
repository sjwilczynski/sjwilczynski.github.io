import * as React from "react";
import SocialMedias from "./SocialMedias";
import ReactMarkdown from "react-markdown";

export type AboutData = {
  name: string;
  surname: string;
  city: string;
  country: string;
  email: string;
  githubUrl: string;
  introduction: string;
};

export default function About(props: { data: AboutData }) {
  const about = props.data;
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
      <ReactMarkdown className="lead mb-5" source={about.introduction} />
      <SocialMedias />
    </>
  );
}
