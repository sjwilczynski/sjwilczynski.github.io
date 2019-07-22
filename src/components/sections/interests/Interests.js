import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import concertDatas from './../../../data/concerts';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Concert} from "../../../data/wrappers/Concert";

class Interests extends Component {

    constructor(props){
        super(props);
        this.concertsList = concertDatas.map(concertData => new Concert(concertData));
        this.concertsList.sort((c1, c2) => c2.startDate - c1.startDate);
    }


    render() {
        return (
            <>
                <p>
                    Apart from being a programmer and a student, I mostly enjoy doing
                    and watching various sports, especially basketball, athletics,
                    swimming and football. Among basketball leagues I consider NBA to be most fascinating and
                    my two favorite players are <a href="https://www.youtube.com/watch?v=w3l3txhX0L4">Russel
                    Westbrook</a> and <a href="https://www.youtube.com/watch?v=-f6TnC0xFPY">Kevin
                    Durant</a> <FontAwesomeIcon icon={"basketball-ball"}/>. As a former
                    sprinter I am still shocked by Wayde van Niekerk's <a
                    href="https://www.youtube.com/watch?v=xG91krXuxyw">world record</a>.
                </p>
                <p>
                    As for my other interests I am keen on travelling <FontAwesomeIcon icon={"plane"}/> (most beautiful city - Porto,
                    Portugal, most astonishing view - Tatev, Armenia, best beach -
                    Tangalle, Sri Lanka). Aside from that, in my free time I like visiting escape rooms and
                    reading books <FontAwesomeIcon icon={"book"}/> (particularly fantasy
                    and history). However my most beloved activity is going to rock
                    concerts (I've been to around 40 already).
                </p>
                <VerticalTimeline>

                    {this.concertsList.map(concert =>
                    <VerticalTimelineElement date={concert.getDate()}>
                        <h3>{concert.title}</h3>
                        <h4>{concert.location}</h4>
                        <p>{concert.description}</p>
                    </VerticalTimelineElement>)}
                </VerticalTimeline>
            </>
        );
    }
}

export default Interests;
