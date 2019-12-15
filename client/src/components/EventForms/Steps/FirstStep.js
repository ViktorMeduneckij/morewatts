import React, { useState } from "react";
import { navigate } from "@reach/router";

const FirstStep = () => {
  const [events, setEvents] = useState([]);
  const [titlesArray, setTitlesArray] = useState([]);
  const [existingEvent, setExistingEvent] = useState(false);

  const loadExisting = () => {
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

  const parseEvents = data => {
    if (data) {
      data.forEach(d => {
        if (!titlesArray.includes(d.title)) {
          titlesArray.push(d.title);
          events.push(d);
        }
      });
      setTitlesArray(titlesArray.slice(0));
      setEvents(events.slice(0));
    }
  };

  const renderExistingForm = () => {
    if (existingEvent) {
      navigate(`/new/existing-event/${existingEvent.id}`);
    }
  };

  return (
    <div>
      <form className="flex flex-col text-center">
        <label className="my-4 cursor-pointer">Nauja treniruotė</label>
        <label className="cursor-pointer" onClick={loadExisting}>
          Egzistuojanti treniruotė
        </label>
        {events.length > 0 && (
          <>
            <select onChange={() => setExistingEvent(item)}>
              {events.map((item, index) => (
                <option key={index}>{item.title}</option>
              ))}
            </select>
            <button className="mw2 success mt-3" onClick={renderExistingForm}>
              Toliau
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default FirstStep;
