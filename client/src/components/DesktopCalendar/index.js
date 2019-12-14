import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { navigate } from "@reach/router";

import { MW_MEMBERS } from "../../constants";

import "react-big-calendar/lib/css/react-big-calendar.css";

import "./index.css";

const DesktopCalendar = () => {
  const [data, setData] = useState(false);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    if (!data) {
      retrieveData();
    }
  }, []);

  const retrieveData = () => {
    fetch("/api/v.1.0/events", { mode: "no-cors" })
      .then(function(response) {
        if (!response.ok) {
          console.log("Something is wrong");
          return;
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          return;
        }
        parseEvents(data);
      });
  };

  const parseEvents = events => {
    events.map(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      event.start = new Date(eventStart.setHours(eventStart.getHours() - 2));
      event.end = new Date(eventEnd.setHours(eventEnd.getHours() - 2));
    });

    // var tryMember = MW_MEMBERS.filter(member => member.name === userName);

    // if (tryMember.length < 1) {
    //   events.map((event, i) => {
    //     if (event.isMw === true) {
    //       events.splice(i, 1);
    //     }
    //   });
    // }

    setData(events);
  };

  const handleEventClick = event => {
    navigate(`/event/${event._id}`);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    switch (event.type) {
      case "strength":
        return {
          className: "strength-event",
        };
      case "road":
        return {
          className: "road-event",
        };
      case "mtb":
        return {
          className: "mtb-event",
        };
      case "indoor":
        return {
          className: "indoor-event",
        };
      default:
        return {
          className: "general-event",
        };
    }
  };

  return (
    data && (
      <div className="DesktopCalendar container--lg">
        <Calendar
          localizer={localizer}
          events={data}
          defaultView="week"
          views={["week"]}
          onSelectEvent={handleEventClick}
          step={60}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    )
  );
};

export default DesktopCalendar;
