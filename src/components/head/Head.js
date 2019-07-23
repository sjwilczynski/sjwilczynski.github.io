import React, {Component} from 'react';
import Helmet from "react-helmet/es/Helmet";

class Head extends Component {

    render() {
        return (
            <>
                <Helmet>

                    <link rel="shortcut icon" href={process.env.PUBLIC_URL + "/img/favicon.ico"}/>

                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

                    <meta name="description" content={this.props.description}/>
                    <meta name="author" content={this.props.fullname}/>
                    <title>{this.props.fullname}</title>
                </Helmet>
            </>
        );
    }
}

export default Head;
