import React from 'react';
import Helmet from "react-helmet";

type HeadProps = {
    description: string,
    fullName: string
}

export default function Head(props: HeadProps) {

    return (
        <>
            <Helmet>

                <link rel="shortcut icon" href={process.env.PUBLIC_URL + "/img/favicon.ico"}/>

                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

                <meta name="description" content={props.description}/>
                <meta name="author" content={props.fullName}/>
                <title>{props.fullName}</title>
            </Helmet>
        </>
    )
}
