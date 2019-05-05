import React, {Component} from 'react';
import ResumeList from "../../resume/ResumeList";

class Skills extends Component {

    constructor(props) {
        super(props);
        this.skills = props.skills;
        this.columns = this.skills.columns;

        this.skillsChunked = this.splitToChunks(this.skills.data, this.columns);
    }

    splitToChunks(skills, columns) {

        let perChunk = Math.ceil(skills.length / columns);

        return skills.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = {data: [], listStyle: this.skills.listStyle, id: index}
            }

            resultArray[chunkIndex].data.push(item);

            return resultArray
        }, []);
    }

    render() {
        return (
            <>
                <div className="subheading mb-3 mt-2">{this.skills.title}</div>
                <div className="d-flex">
                    {this.skillsChunked.map(skillChunk =>
                        <div key={skillChunk.id} className={"col-" + Math.floor(12 / this.columns)}>
                            <ResumeList key={skillChunk.id} data={skillChunk}/>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default Skills;
