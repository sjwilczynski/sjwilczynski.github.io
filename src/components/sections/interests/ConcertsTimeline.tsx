import type { Concert } from "@data/types";
import { useState } from "react";
import * as vt from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export const ConcertsTimeline = ({ concerts }: { concerts: Concert[] }) => {
  const [showConcerts, setShowConcerts] = useState(false);

  const onConcertsClick = () => {
    setShowConcerts((showConcerts) => !showConcerts);
    document
      .querySelector("#interests")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="d-grid mb-2">
        <button className="btn btn-primary mt-2" onClick={onConcertsClick}>
          Click here to {showConcerts ? "hide" : "view"} the full concerts list
        </button>
      </div>
      {showConcerts && (
        <vt.VerticalTimeline>
          {concerts.map((concert) => (
            <vt.VerticalTimelineElement
              key={concert.id}
              date={concert.date}
              icon={<GuitarIcon />}
              iconStyle={{ background: "#4479a2", color: "#fff" }}
            >
              <h3>{concert.title}</h3>
              <h4>{concert.location}</h4>
              <p>{concert.description}</p>
            </vt.VerticalTimelineElement>
          ))}
        </vt.VerticalTimeline>
      )}
    </>
  );
};

// icon obtained from https://icon-sets.iconify.design/game-icons/guitar/
const GuitarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ verticalAlign: "-0.125em" }}
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 512 512"
  >
    <rect x="0" y="0" width="512" height="512" fill="none" stroke="none" />
    <path
      fill="currentColor"
      d="m491.938 18.813l-17.72 2.375l-89.374 11.968l-6.22.844l-1.562 6.094l-18.5 72.156l-136.187 137.28c-2.094-4.4-4.324-8.708-6.875-12.843c-7.317-11.86-18.338-22.357-34.844-25.687c-6.457-1.303-12.664-1.702-18.53-1.28c-17.602 1.26-32.182 9.775-41.69 22.5c-10.95 14.654-15.87 34.054-15.31 54.405c-36.16 4.516-66.336 31.382-80.657 64.313c-15.608 35.885-11.856 80.956 24.655 111.156c43.28 35.8 88.28 31.622 119.875 11.22c28.593-18.467 47.778-48.14 50.813-74.752c18.615-2.81 38.424-9.03 56.375-17.968c20.474-10.195 38.536-23.433 48.406-40.063l7.625-12.874l-14.908-1.22c-34.56-2.818-53.76-12.87-66.406-26.217l146-147.22l18.938 1.375l6.156.438l2.813-5.5l6.125-11.907l25.03 11.906L464 132.438l-24.53-11.656l7.655-14.874l25.844 12.28l8.03-16.874l-25.313-12.03L464 73.155L491.03 86l8.033-16.875L472.53 56.53l11.22-21.81l8.188-15.907zm-124.532 111l13.22 13.093l-200.22 201.875a61.253 61.253 0 0 0-5.062-5.717a60.956 60.956 0 0 0-8.47-7l200.532-202.25zm-235.47 210.093c10.914-.046 21.837 4.094 30.25 12.438a42.57 42.57 0 0 1 .25 60.406a42.57 42.57 0 0 1-60.405.25a42.575 42.575 0 0 1-.25-60.406c8.345-8.415 19.245-12.64 30.157-12.688z"
    />
  </svg>
);
