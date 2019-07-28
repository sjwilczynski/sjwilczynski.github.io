import React, {useState} from 'react';
import concertDatas from './../../../data/concerts.json';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {ConcertData} from "../../../data/wrappers/ConcertData";
import Button from "react-bootstrap/Button";
import {scroller} from "react-scroll";
import './interests.scss'
import {GiGuitar} from "react-icons/gi";
import {FaBasketballBall, FaBook, FaPlane} from "react-icons/fa";

export default function Interests() {

    const [showConcerts, setShowConcerts] = useState(false);

    let onConcertsClick = () => {
        setShowConcerts(showConcerts => !showConcerts);
        scroller.scrollTo('interests', {})
    };

    const concertsList = concertDatas.map((concertData: any) => new ConcertData(concertData)).sort((c1: ConcertData, c2: ConcertData) => c2.startDate.getTime() - c1.endDate.getTime());
    return (
        <>
            <p>
                Apart from being a programmer and a student, I mostly enjoy doing
                and watching various sports, especially basketball, athletics,
                swimming and football. Among basketball leagues I consider NBA to be most fascinating and
                my two favorite players are <a href="https://www.youtube.com/watch?v=w3l3txhX0L4">Russel
                Westbrook</a> and <a href="https://www.youtube.com/watch?v=-f6TnC0xFPY">Kevin
                Durant</a> <FaBasketballBall className={'basketball-ball-icon svg-inline--fa'}/>. As a former
                sprinter I am still shocked by Wayde van Niekerk's <a
                href="https://www.youtube.com/watch?v=xG91krXuxyw">world record</a>.
            </p>
            <p>
                As for my other interests I am keen on travelling <FaPlane className={"svg-inline--fa"}/> (most
                beautiful
                city - Porto,
                Portugal, most astonishing view - Tatev, Armenia, best beach -
                Tangalle, Sri Lanka). Aside from that, in my free time I like visiting escape rooms and
                reading books <FaBook className={'book-icon svg-inline--fa'}/> (particularly fantasy
                and history). However my most beloved activity is going to rock
                concerts (I've been to around 40 already).
                <Button className='mt-2 btn-concerts' block onClick={onConcertsClick}> Click here
                    to {showConcerts ? 'hide' : 'view'} the full concerts list </Button>
            </p>

            {showConcerts &&
            <VerticalTimeline>
                {concertsList.map((concert: ConcertData) =>
                    <VerticalTimelineElement key={concert.id} date={concert.getDate()} icon={<GiGuitar/>}
                                             iconStyle={{background: '#4479a2', color: '#fff'}}>
                        <h3>{concert.title}</h3>
                        <h4>{concert.location}</h4>
                        <p>{concert.description}</p>
                    </VerticalTimelineElement>)}
            </VerticalTimeline>
            }
        </>
    );
}
