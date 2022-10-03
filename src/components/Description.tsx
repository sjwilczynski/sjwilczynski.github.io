import ReactMarkdown from "react-markdown";

export const Description = ({
  description,
  asSpan = false,
}: {
  description: string;
  asSpan?: boolean;
}) => (
  <ReactMarkdown
    components={
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      asSpan ? { p: ({ node, ...props }) => <span {...props} /> } : undefined
    }
  >
    {description}
  </ReactMarkdown>
);
