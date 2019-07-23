import React, {Component} from 'react';
import ResumeList from "../../resume/ResumeList";

class Skills extends Component {

    splitToChunks(skills, columns) {

        const elements = skills.elements;
        const perChunk = Math.ceil(elements.length / columns);

        return elements.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = {elements: [], listStyle: skills.listStyle, id: index}
            }

            resultArray[chunkIndex].elements.push(item);

            return resultArray
        }, []);
    }

    render() {
        const skills = this.props.skills;
        const columns = skills.columns;
        const skillsChunked = this.splitToChunks(skills, columns);
        return (
            <>
                <div className="subheading mb-3 mt-2">{skills.title}</div>
                <div className="d-flex">
                    {skillsChunked.map(skillChunk =>
                        <div key={skillChunk.id} className={"col-" + Math.floor(12 / columns)}>
                            <ResumeList key={skillChunk.id} data={skillChunk}/>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default Skills;
