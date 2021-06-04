import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import moment from "moment";

import duration from "../../../images/duration.svg";
import subscriber from "../../../images/subscriber.svg";
import salesBg from "../../../images/salesTrefke.png";
import roadBg from "../../../images/road-banner.jpg";
import mtbBg from "../../../images/mtb-banner.png";
import indoorBg from "../../../images/stakliuTrefke.jpg";
import mwBadge from "../../../images/mw_badge.png";

const EventCard = ({ event }) => {
  const [bgImage, setBgImage] = useState(false);
  const [eventColor, setEventColor] = useState(false);

  useEffect(() => {
    if (!bgImage && !eventColor) {
      resovleEventProps();
    }
  });

  const resovleEventProps = () => {
    switch (event.type.toLowerCase()) {
      case "strength":
        setBgImage(salesBg);
        setEventColor("#FDB713");
        break;

      case "road":
        setBgImage(roadBg);
        setEventColor("#3F8EFC");
        break;

      case "mtb":
        setBgImage(mtbBg);
        setEventColor("#12b53b");
        break;

      case "indoor":
        setBgImage(indoorBg);
        setEventColor("#f788ab");
        break;

      case "child":
        setBgImage(roadBg);
        setEventColor("#ff8d00");
        break;

      default:
        setBgImage(salesBg);
        setEventColor("#FDB713");
    }
  };

  const convertDate = (time) => {
    return moment(time).format("HH:mm");
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

    if (minutes === 0) {
      return `${hours} val.`;
    } else {
      return `${hours}: ${minutes}`;
    }
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
          borderBottom: `10px solid ${eventColor}`,
          zIndex: "0",
        }}
        onClick={() => navigate(`/event/${event._id}`)}
      >
        <div
          className="absolute bottom-0 right-0 p-3"
          style={{
            left: "10px",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: "2",
          }}
        >
          <div className="flex no-wrap">
            <span className="font-bold pr-4">{convertDate(event.start)}</span>
            <span
              style={{
                width: "200px",
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
                style={{ height: "24px", width: "17px" }}
              />
              <span className="pl-2">{countDuration()}</span>
            </span>
            <span className="font-bold flex items-center">
              <img
                src={subscriber}
                alt=""
                style={{ height: "24px", width: "17px" }}
              />
              <span className="pl-2">{event.subscribers.length}</span>
            </span>
          </div>
        </div>
        {event.isMw && (
          <span
            className="absolute right-0"
            style={{ zIndex: "1", top: "50%", transform: "translateY(-50%)" }}
          >
            <img src={mwBadge} alt="" />
          </span>
        )}
      </div>
    )
  );
};

export default EventCard;
