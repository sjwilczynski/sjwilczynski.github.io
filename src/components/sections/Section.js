import React from 'react';

export default function Section(props) {

    return (
        <>
            <section className="resume-section p-3 p-lg-5 d-flex flex-column" id={props.id}>
                <div className="my-auto">
                    {props.title ? <h2 className="mb-5">{props.title}</h2> : ""}
                    {props.children}
                </div>
            </section>
            <hr className="m-0"/>
        </>
    );
}
