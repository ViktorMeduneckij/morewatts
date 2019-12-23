import React, { useState, useEffect } from "react";
import moment from "moment";

import duration from "../../../images/duration.svg";
import subscriber from "../../../images/subscriber.svg";

import salesBg from "../../../images/salesTrefke.png";
import roadBg from "../../../images/salesTrefke.png";
import mtbBg from "../../../images/salesTrefke.png";
import indoorBg from "../../../images/stakliuTrefke.jpg";
import { navigate } from "@reach/router";

const EventCard = ({ event }) => {
  const [bgImage, setBgImage] = useState(false);

  useEffect(() => {
    if (!bgImage) {
      resovleBgImg();
    }
  });

  const resovleBgImg = () => {
    switch (event.type) {
      case "strength":
        setBgImage(salesBg);
        break;
      case "road":
        setBgImage(roadBg);
        break;

      case "mtb":
        setBgImage(mtbBg);
        break;

      case "indoor":
        setBgImage(indoorBg);
        break;

      default:
        setBgImage(salesBg);
    }
  };

  const convertDate = time => {
    return moment(time).format("dddd, HH:mm");
  };
  const countDuration = () => {
    const a = moment(event.start);
    const b = moment(event.end);

    var delta = Math.abs(b - a) / 1000;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    return `${hours}: ${minutes}`;
  };

  return (
    event && (
      <div
        className="p-6 relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "130px",
          borderBottom: "10px solid #fdb713",
        }}
        onClick={() => navigate(`/event/${event._id}`)}
      >
        <div
          className="absolute bottom-0 right-0 p-3"
          style={{
            left: "10px",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            backgroundColor: "rgb(255, 255, 255, 0.8)",
          }}
        >
          <div className="flex no-wrap">
            <span className="font-bold pr-4">{convertDate(event.start)}</span>
            <span
              style={{
                width: "100px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {event.title}
            </span>
          </div>
          <div className="flex">
            <span className="font-bold flex items-center pr-4">
              <img
                src={duration}
                alt=""
                style={{ height: "15px", width: "15px" }}
              />
              <p className="pl-2">{countDuration()}</p>
            </span>
            <span className="font-bold flex items-center">
              <img
                src={subscriber}
                alt=""
                style={{ height: "15px", width: "15px" }}
              />
              <p className="pl-2">{event.subscribers.length}</p>
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default EventCard;
