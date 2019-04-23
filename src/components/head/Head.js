import React, {Component} from 'react';
import Helmet from "react-helmet/es/Helmet";
import data from '../../data/basic-data'

class Head extends Component {

    render() {
        return (
            <>
                <Helmet>
                    <meta name="description" content={this.props.description}/>
                    <meta name="author" content={data.fullname}/>
                    <title>{data.fullname}</title>
                </Helmet>
            </>
        );
    }
}

export default Head;
