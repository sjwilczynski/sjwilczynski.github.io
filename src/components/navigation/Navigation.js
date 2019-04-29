import React, {Component} from 'react';
import face from './face.jpg';
import {scroller} from "react-scroll";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import './navigation.css'


class Navigation extends Component {


    render() {

        /* these 2 functions together with properties of body allow scroll spying and smooth scroll */
        let onSelect = (eventKey, event) => {
            event.preventDefault();
            scrollTo(eventKey);
        };
        let scrollTo = (element) => {
            scroller.scrollTo(element, {
                duration: 1000,
                smooth: "easeInOutQuint"
            })
        };

        let sections = this.props.sections;
        return (
            <>
                <Navbar expand="lg" bg="primary" variant="dark" fixed="top" collapseOnSelect onSelect={onSelect}
                        id="sideNav">
                    <Navbar.Brand>
                        <span className="d-block d-lg-none">{this.props.fullname}</span>
                        <span className="d-none d-lg-block">
                            <img className="img-fluid img-profile rounded-circle mx-auto mb-2" src={face} alt="Face"
                                 onClick={() => scrollTo("root")}/>
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent"/>
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav>
                            {Object.entries(sections).map(keyValue =>
                                <Nav.Item key={keyValue[0]}>
                                    <Nav.Link eventKey={keyValue[0]} href={"#" + keyValue[0]}>{keyValue[1]}</Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

export default Navigation;
