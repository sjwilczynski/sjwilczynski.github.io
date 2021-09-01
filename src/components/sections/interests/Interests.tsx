import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Button from "react-bootstrap/Button";
import { scroller } from "react-scroll";
import "./interests.scss";
import { GiGuitar } from "react-icons/gi";
import { FaBasketballBall, FaBook, FaPlane } from "react-icons/fa";
import { Concert } from "../../../data/types";

export default function Interests(props: { concerts: Concert[] }) {
  const [showConcerts, setShowConcerts] = useState(false);

  const onConcertsClick = () => {
    setShowConcerts((showConcerts) => !showConcerts);
    scroller.scrollTo("interests", {});
  };

  return (
    <>
      <p>
        Apart from being a programmer and a student, I mostly enjoy doing and
        watching various sports, especially basketball, athletics, swimming and
        football. Among basketball leagues I consider NBA to be most fascinating
        and my two favorite players are{" "}
        <a href="https://www.youtube.com/watch?v=w3l3txhX0L4">
          Russel Westbrook
        </a>{" "}
        and{" "}
        <a href="https://www.youtube.com/watch?v=-f6TnC0xFPY">Kevin Durant</a>{" "}
        <FaBasketballBall className={"basketball-ball-icon svg-inline--fa"} />.
        As a former sprinter I am still shocked by Wayde van Niekerk's{" "}
        <a href="https://www.youtube.com/watch?v=xG91krXuxyw">world record</a>.
      </p>
      <p>
        As for my other interests, I am keen on travelling{" "}
        <FaPlane className={"svg-inline--fa"} /> (most beautiful city - Porto,
        Portugal, most astonishing view - Tatev, Armenia, best beach - Tangalle,
        Sri Lanka). In my free time I like visiting escape rooms and reading{" "}
        <a href="https://www.goodreads.com/user/show/100417409-stanis-aw-wilczy-ski">
          books
        </a>{" "}
        <FaBook className={"book-icon svg-inline--fa"} />. However, my most
        beloved activity is going to rock concerts.
      </p>
      <div className="d-grid">
        <Button className="mt-2 btn-concerts" onClick={onConcertsClick}>
          Click here to {showConcerts ? "hide" : "view"} the full concerts list
        </Button>
      </div>
      {showConcerts && (
        <VerticalTimeline>
          {props.concerts.map((concert) => (
            <VerticalTimelineElement
              key={concert.id}
              date={concert.date}
              icon={<GiGuitar />}
              iconStyle={{ background: "#4479a2", color: "#fff" }}
            >
              <h3>{concert.title}</h3>
              <h4>{concert.location}</h4>
              <p>{concert.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      )}
      <p>
        I am also an avid fan of the{" "}
        <a href="https://en.wikipedia.org/wiki/Marvel_Cinematic_Universe">
          MCU
        </a>{" "}
        and a follower of{" "}
        <a href="https://www.gapminder.org/factfulness-book/">
          Factfulness idea
        </a>
        .
      </p>
    </>
  );
}
