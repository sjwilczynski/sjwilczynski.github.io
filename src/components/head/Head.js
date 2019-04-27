import React, {Component} from 'react';
import Helmet from "react-helmet/es/Helmet";

class Head extends Component {

    render() {
        return (
            <>
                <Helmet>

                    <link rel="shortcut icon" href="%PUBLIC_URL%/img/favicon/favicon.ico"/>
                    <link rel="icon" sizes="16x16 32x32 64x64" href="%PUBLIC_URL%/img/favicon/favicon.ico"/>
                    <link rel="icon" type="image/png" sizes="196x196" href="%PUBLIC_URL%/img/favicon/favicon-192.png"/>
                    <link rel="icon" type="image/png" sizes="160x160" href="%PUBLIC_URL%/img/favicon/favicon-160.png"/>
                    <link rel="icon" type="image/png" sizes="96x96" href="%PUBLIC_URL%/img/favicon/favicon-96.png"/>
                    <link rel="icon" type="image/png" sizes="64x64" href="%PUBLIC_URL%/img/favicon/favicon-64.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/img/favicon/favicon-32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/img/favicon/favicon-16.png"/>
                    <link rel="apple-touch-icon" href="%PUBLIC_URL%/img/favicon/favicon-57.png"/>
                    <link rel="apple-touch-icon" sizes="114x114" href="%PUBLIC_URL%/img/favicon/favicon-114.png"/>
                    <link rel="apple-touch-icon" sizes="72x72" href="%PUBLIC_URL%/img/favicon/favicon-72.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="%PUBLIC_URL%/img/favicon/favicon-144.png"/>
                    <link rel="apple-touch-icon" sizes="60x60" href="%PUBLIC_URL%/img/favicon/favicon-60.png"/>
                    <link rel="apple-touch-icon" sizes="120x120" href="%PUBLIC_URL%/img/favicon/favicon-120.png"/>
                    <link rel="apple-touch-icon" sizes="76x76" href="%PUBLIC_URL%/img/favicon/favicon-76.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="%PUBLIC_URL%/img/favicon/favicon-152.png"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/img/favicon/favicon-180.png"/>
                    <meta name="msapplication-TileColor" content="#FFFFFF"/>
                    <meta name="msapplication-TileImage" content="%PUBLIC_URL%/img/favicon/favicon-144.png"/>
                    <meta name="msapplication-config" content="%PUBLIC_URL%/img/favicon/browserconfig.xml"/>

                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

                    <meta name="description" content={this.props.description}/>
                    <meta name="author" content={this.props.data.fullname}/>
                    <title>{this.props.data.fullname}</title>
                </Helmet>
            </>
        );
    }
}

export default Head;
