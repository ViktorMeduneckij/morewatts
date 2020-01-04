import React, { useState, useEffect } from "react";
import _ from "lodash";

import EventCard from "./EventCard";
import emptyCalendar from "../../images/calendar.svg";
import moment from "moment";
import { MONTH_NAMES, DAY_NAMES } from "../../constants";

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

    sortedActivities = validEvents.sort((a, b) => {
      if (a.start < b.start) return -1;
      if (a.start > b.start) return 1;
      return 0;
    });

    const eventChunks = _.groupBy(sortedActivities, date => {
      return moment(date.start)
        .startOf("day")
        .format();
    });

    setData(eventChunks);
  };

  return data ? (
    <div className="bg-orange-400">
      <div className="text-center text-white uppercase font-bold py-3 mb-3">
        Artėjančios treniruotės
      </div>
      {Object.keys(data).map((item, index) => (
        <div key={index}>
          <div className="py-3 text-center bg-gray-700 text-white uppercase font-bold">{`${
            MONTH_NAMES[new Date(item).getMonth()]
          } ${new Date(item).getDate()} (${
            DAY_NAMES[new Date(item).getDay()]
          })`}</div>
          <div>
            {data[item].map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <span className="text-center text-gray-500 font-medium text-xl">
      <img
        src={emptyCalendar}
        alt=""
        style={{ maxWidth: "100px" }}
        className="mx-auto"
      />
      <p className="pt-4">Kol kas treniruociu nera, patikrinkite ateityje</p>
    </span>
  );
};

export default MobileCalendar;
