type Props = {
  id: string;
  title?: string;
  children?: React.ReactNode;
};

export const Section = ({ id, title, children }: Props) => (
  <>
    <section className="resume-section p-3 p-lg-5 d-flex flex-column" id={id}>
      <div className="my-auto">
        {title ? <h2 className="mb-5">{title}</h2> : ""}
        {children}
      </div>
    </section>
    <hr className="m-0" />
  </>
);
