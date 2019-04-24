import React, {Component} from 'react';
import Section from "../Section";
import achievementList from "../../../data/achivements";

class AchievementList extends Component {

    render() {
        return (
            <>
                <Section id="achievements" title="Achievements & awards">
                    <ul className="fa-ul mb-0">
                        {achievementList.map(achievement =>
                            <li>
                                <i className={"fa-li fa " + achievement.classNames}></i>
                                {achievement.description}
                            </li>)}
                    </ul>
                </Section>
            </>
        );
    }
}

export default AchievementList;
