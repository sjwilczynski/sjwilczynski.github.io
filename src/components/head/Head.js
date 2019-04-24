import React, {Component} from 'react';
import Helmet from "react-helmet/es/Helmet";

class Head extends Component {

    render() {
        return (
            <>
                <Helmet>
                    <meta name="description" content={this.props.description}/>
                    <meta name="author" content={this.props.data.fullname}/>
                    <title>{this.props.data.fullname}</title>
                </Helmet>
            </>
        );
    }
}

export default Head;
