import { Helmet } from "react-helmet";

type Props = {
  description: string;
  fullName: string;
  children?: React.ReactNode;
};

export const Head = ({ description, fullName, children }: Props) => (
  <Helmet>
    <link
      rel="shortcut icon"
      href={process.env.PUBLIC_URL + "/img/favicon.ico"}
    />

    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <meta name="description" content={description} />
    <meta name="author" content={fullName} />
    {children}
  </Helmet>
);
