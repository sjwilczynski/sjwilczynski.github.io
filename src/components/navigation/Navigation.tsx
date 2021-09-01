import face from "./face.webp";
import { scroller } from "react-scroll";
import { Nav, Navbar } from "react-bootstrap";
import "./navigation.scss";
import { Sections } from "../../App";

type Props = {
  fullName: string;
  sections: Sections;
};

export default function Navigation(props: Props) {
  /* these 2 functions together with properties of body allow scroll spying and smooth scroll */
  const onSelect = (
    eventKey: string | null,
    event: React.SyntheticEvent<unknown>
  ) => {
    event.preventDefault();
    scrollTo(eventKey);
  };
  const scrollTo = (element: any) => {
    scroller.scrollTo(element, {
      duration: 300,
      smooth: "easeInOutQuint",
    });
  };

  return (
    <>
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
          <span className="d-block d-lg-none">{props.fullName}</span>
          <span className="d-none d-lg-block">
            <img
              className="img-fluid img-profile rounded-circle mx-auto mb-2"
              src={face}
              alt="Face"
              onClick={() => scrollTo("root")}
            />
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav>
            {Object.entries(props.sections).map((keyValue) => (
              <Nav.Item key={keyValue[0]}>
                <Nav.Link
                  active={false}
                  eventKey={keyValue[0]}
                  href={"#" + keyValue[0]}
                >
                  {keyValue[1]}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
