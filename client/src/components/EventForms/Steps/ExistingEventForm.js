import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { navigate } from "@reach/router";

import { Button } from "@material-ui/core";

import "react-datepicker/dist/react-datepicker.css";

const ExistingEventForm = () => {
  const [event, setEvent] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (!event) {
      getEvent();
    }
  });

  const getEvent = () => {
    fetch("/api/v.1.0/event/" + window.location.pathname.split("/").pop())
      .then(function(response) {
        if (!response.ok) {
          console.log("Failed to get single event.");
          return;
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          return;
        }
        data.subscribers = [];
        setEvent(data);
      });
  };

  const createEvent = () => {
    event.start = new Date(startDate).toISOString();
    event.end = new Date(endDate).toISOString();

    sendEvent();
  };

  const sendEvent = () => {
    fetch("/submit-create-event", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.title,
        type: event.type,
        startDate: event.start,
        endDate: event.end,
        city: event.city,
        startLocation: event.startLocation,
        level: event.level,
        distance: event.distance,
        speed: event.speed,
        generalInfo: event.generalInfo,
        markers: event.markers,
        maxPpl: event.maxPpl,
        isMw: event.isMw,
      }),
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 422) {
            return response.json();
          }
        }
        navigate("/");
      })
      .then(err => {
        if (!err || !err.errors) {
          return;
        }
        this.setState({
          errors: err.errors,
        });
        window.scrollTo(0, 0);
      })
      .catch(err => {
        console.error("CATCH ERROR", err);
      });
  };

  return (
    <div className="flex flex-col container--lg">
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/event/add")}
        >
          Atgal viena žingsnį
        </Button>
      </div>
      <div className="mb-3 flex flex-col">
        <label className="font-bold">Pradžios laikas</label>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Laikas"
          dateFormat="MMMM d, yyyy HH:mm"
        />
      </div>
      <div className="mb-3 flex flex-col">
        <label className="font-bold">Pabaigos laikas</label>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Laikas"
          dateFormat="MMMM d, yyyy HH:mm"
        />
      </div>
      <Button variant="contained" color="primary" onClick={createEvent}>
        Sukurti
      </Button>
    </div>
  );
};

export default ExistingEventForm;
