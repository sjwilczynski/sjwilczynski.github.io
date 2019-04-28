import React, {Component} from 'react';
import face from './face.jpg';
import {animateScroll as scroll, Link} from "react-scroll";


class Navigation extends Component {


    render() {
        let sections = this.props.sections;
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
                    <span className="navbar-brand">
                        <span className="d-block d-lg-none">{this.props.fullname}</span>
                        <span className="d-none d-lg-block">
                            <img className="img-fluid img-profile rounded-circle mx-auto mb-2" src={face} alt="Face"
                                 onClick={() => scroll.scrollToTop()}/></span>
                    </span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            {Object.entries(sections).map(keyValue =>
                                <li key={keyValue[0]} className="nav-item">
                                    <Link className="nav-link" data-toggle="collapse" data-target="#navbarSupportedContent" spy={true} smooth={true} duration={1000}
                                          to={keyValue[0]}> {keyValue[1]}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}

export default Navigation;
