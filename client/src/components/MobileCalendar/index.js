import React, { useState, useEffect } from "react";

import EventCard from "./EventCard";

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

    setData(validEvents);

    // var tryMember = MW_MEMBERS.filter(member => member.name === userName);

    // if (tryMember.length < 1) {
    //   events.map((event, i) => {
    //     if (event.isMw === true) {
    //       events.splice(i, 1);
    //     }
    //   });
    // }
  };

  return (
    data && (
      <div>
        {data.map((item, index) => (
          <EventCard key={index} event={item} />
        ))}
      </div>
    )
  );
};

export default MobileCalendar;
