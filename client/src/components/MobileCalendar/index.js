import React, { useState, useEffect } from "react";

import EventCard from "./EventCard";
import emptyCalendar from "../../images/calendar.svg";

const MobileCalendar = () => {
  const [data, setData] = useState(false);

  useEffect(() => {
    if (!data) {
      retrieveData();
    }
  });

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
    const currentDate = new Date();
    let validEvents = [];
    let sortedActivities = [];

    events.map(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      event.start = eventStart;
      event.end = eventEnd;

      if (event.start >= currentDate) {
        validEvents.push(event);
      }

      return false;
    });

    sortedActivities = validEvents.sort(function(a, b) {
      if (a.start < b.start) return -1;
      if (a.start > b.start) return 1;
      return 0;
    });

    setData(sortedActivities);
  };

  return (
    <div>
      {data ? (
        data.map((item, index) => <EventCard key={index} event={item} />)
      ) : (
        <span className="text-center text-gray-500 font-medium text-xl">
          <img
            src={emptyCalendar}
            alt=""
            style={{ maxWidth: "100px" }}
            className="mx-auto"
          />
          <p className="pt-4">
            Kol kas treniruociu nera, patikrinkite ateityje
          </p>
        </span>
      )}
    </div>
  );
};

export default MobileCalendar;
