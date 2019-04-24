import React, {Component} from 'react';

class SkillSubsection extends Component {

    constructor(props) {
        super(props);
        this.skills = props.skills;
        this.columns = this.skills.columns;

        this.skillsChunked = this.splitToChunks(this.skills.skills, this.columns);
    }

    splitToChunks(skills, columns) {

        let perChunk = Math.ceil(skills.length / columns);

        return skills.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item);

            return resultArray
        }, []);
    }

    render() {
        return (
            <>
                <div className="subheading mb-3 mt-2">{this.skills.title}</div>
                <div className="d-flex">
                    {this.skillsChunked.map(skillChunk =>
                        <div className={"col-" + Math.floor(12 / this.columns)}>
                            <ul className={"fa-ul mb-0 " + this.skills.listStyle}>
                                {
                                    skillChunk.map(skill => {
                                        let iconBefore = skill.iconBefore ?
                                            <i className={"fas " + skill.iconBefore}></i> : "";
                                        let iconAfter = skill.iconAfter ?
                                            <i className={"fas " + skill.iconAfter}></i> : "";
                                        let skillDescription = skill.url ?
                                            <a href={skill.url}>{skill.name}</a> : skill.name;
                                        return <li>{iconBefore} {skillDescription} {iconAfter}</li>
                                    })
                                }
                            </ul>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default SkillSubsection;
