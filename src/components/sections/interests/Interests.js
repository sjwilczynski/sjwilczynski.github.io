import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Interests extends Component {

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
            </>
        );
    }
}

export default Interests;
