import React, {Component} from 'react';

class Section extends Component {

    render() {
        return (
            <>
                <section className="resume-section p-3 p-lg-5 d-flex flex-column" id={this.props.id}>
                    <div className="my-auto">
                        {this.props.title ? <h2 className="mb-5">{this.props.title}</h2> : ""}
                        {this.props.children}
                    </div>
                </section>
                <hr className="m-0"/>
            </>
        );
    }
}

export default Section;
