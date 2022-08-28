import face from "./face.webp";
import { scroller } from "react-scroll";
import { Nav, Navbar } from "react-bootstrap";
import "./navigation.scss";

type Props = {
  fullName: string;
  sections: {
    [key: string]: string;
  };
};

/* these 2 functions together with properties of body allow scroll spying and smooth scroll */
const scrollTo = (element: string) => {
  scroller.scrollTo(element, {
    duration: 300,
    smooth: "easeInOutQuint",
  });
};

const onSelect = (
  eventKey: string | null,
  event: React.SyntheticEvent<unknown>
) => {
  event.preventDefault();
  if (eventKey) {
    scrollTo(eventKey);
  }
};

export const Navigation = ({ sections, fullName }: Props) => {
  const firstSectionKey = Object.entries(sections)[1][0];

  return (
    <Navbar
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
      collapseOnSelect
      onSelect={onSelect}
      id="sideNav"
    >
      <Navbar.Brand>
        <span className="d-block d-lg-none">{fullName}</span>
        <span className="d-none d-lg-block">
          <img
            className="img-fluid img-profile rounded-circle mx-auto mb-2"
            src={face}
            alt="Face"
            onClick={() => scrollTo(firstSectionKey)}
          />
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav>
          {Object.entries(sections).map((keyValue) => (
            <Nav.Item key={keyValue[0]}>
              <Nav.Link eventKey={keyValue[0]} href={"#" + keyValue[0]}>
                {keyValue[1]}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
