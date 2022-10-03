import ReactMarkdown from "react-markdown";

export const Description = ({ description }: { description: string }) => (
  <ReactMarkdown
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    components={{ p: ({ node, ...props }) => <span {...props} /> }}
  >
    {description}
  </ReactMarkdown>
);
