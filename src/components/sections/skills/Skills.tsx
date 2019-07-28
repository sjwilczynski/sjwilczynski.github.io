import React from 'react';
import ResumeList from "../../resume/ResumeList";
import {ResumeListData} from "../../../data/wrappers/ResumeListData";
import {ResumeListElementData} from "../../../data/wrappers/ResumeListElementData";

type SkillsProps = {
    skills: ResumeListData
}

type SkillsChunk = {
    id: number,
    elements: ResumeListElementData[],
    listClassName: string
}

export default function Skills(props: SkillsProps) {

    const splitToChunks = function (elements: ResumeListElementData[], numColumns: number): SkillsChunk[] {

        const perChunk = Math.ceil(elements.length / numColumns);

        return elements.reduce((resultArray: SkillsChunk[], item, index) => {
            const chunkIndex = Math.floor(index / perChunk);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = {elements: [], listClassName: skills.listClassName || "", id: index};
            }

            resultArray[chunkIndex].elements.push(item);

            return resultArray
        }, []);
    };

    const skills = props.skills;
    const numColumns = skills.numColumns || 1;
    const skillsChunked = splitToChunks(skills.elements, numColumns);
    return (
        <>
            <div className="subheading mb-3 mt-2">{skills.title}</div>
            <div className="d-flex">
                {skillsChunked.map(skillChunk =>
                    <div key={skillChunk.id} className={"col-" + Math.floor(12 / numColumns)}>
                        <ResumeList key={skillChunk.id} data={skillChunk}/>
                    </div>
                )}
            </div>
        </>
    )
}
