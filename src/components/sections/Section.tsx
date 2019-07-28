import React from 'react';

type SectionProps = {
    id: string,
    title?: string,
    children?: any
}

export default function Section(props: SectionProps) {

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
