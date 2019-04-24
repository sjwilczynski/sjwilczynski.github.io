import React, {Component} from 'react';
import face from './face.jpg';
import Helmet from "react-helmet";


class Navigation extends Component {

    render() {
        let sections = this.props.sections;
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
                    <a className="navbar-brand js-scroll-trigger" href={"#" + Object.keys(sections)[0]}>
                        <span className="d-block d-lg-none"></span>
                        <span className="d-none d-lg-block"> <img
                            className="img-fluid img-profile rounded-circle mx-auto mb-2" src={face} alt="Face"/></span>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            {Object.entries(sections).map(keyValue =>
                                <li key={keyValue[0]} className="nav-item">
                                    <a className="nav-link js-scroll-trigger" href={"#" + keyValue[0]}>{keyValue[1]}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
                <Helmet>
                    <script src={process.env.PUBLIC_URL + '/vendor/smooth-scrolling.js'}/>
                </Helmet>
            </>
        );
    }
}

export default Navigation;
