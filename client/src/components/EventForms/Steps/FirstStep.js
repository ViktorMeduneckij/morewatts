import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { EVENT_TYPES } from "../../../constants";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";

const FirstStep = () => {
  const [selectedType, setSelectedType] = useState(EVENT_TYPES[0].name);
  const [titlesArray, setTitlesArray] = useState([]);
  const [showEventTypes, setShowEventTypes] = useState(false);
  const [events, setEvents] = useState([]);
  const [showExisting, setShowExisting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(false);

  useEffect(() => {
    if (events.length <= 0) {
      loadExisting();
    }
  });

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
      setSelectedEvent(events[0]);
    }
  };

  const proceedToNew = () => {
    navigate(`/new-event/${selectedType}`);
  };

  const findAndSetSelectedEvent = e => {
    setSelectedEvent(events.find(item => item.title === e.target.value));
  };

  return (
    <div className="container--lg">
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Atgal namo
      </Button>
      <div className="flex flex-col text-center">
        <button
          className="my-4 mw2 general"
          onClick={() => setShowEventTypes(true)}
        >
          Nauja treniruotė
        </button>
        {showEventTypes && (
          <>
            <span>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel id="level-helper-label">Kokia trefke?</InputLabel>
                <Select
                  labelId="level-label"
                  id="level"
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                >
                  {EVENT_TYPES.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </span>
            <span>
              <button className="mw2 success mt-3" onClick={proceedToNew}>
                Toliau
              </button>
            </span>
          </>
        )}
        <button
          className="my-4 mw2 general"
          onClick={() => setShowExisting(true)}
        >
          Egzistuojanti treniruotė
        </button>
        {showExisting && events.length > 0 && (
          <>
            <span>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel id="level-helper-label">Pavadinimas</InputLabel>
                <Select
                  labelId="level-label"
                  id="level"
                  value={selectedEvent.title}
                  onChange={e => findAndSetSelectedEvent(e)}
                >
                  {events.map((item, index) => (
                    <MenuItem key={index} value={item.title}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </span>
            <span>
              <button
                className="mw2 success mt-3"
                onClick={() =>
                  navigate(`/new/existing-event/${selectedEvent._id}`)
                }
              >
                Toliau
              </button>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default FirstStep;
