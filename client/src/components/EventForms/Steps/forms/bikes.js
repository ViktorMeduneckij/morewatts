import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Bikes = ({ type, isEdit, eventId }) => {
  const [editData, setEditData] = useState(false);
  const [error, setError] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [title, setTitle] = useState(false);
  const [location, setLocation] = useState(false);
  const [distance, setDistance] = useState(false);
  const [description, setDescription] = useState(false);
  const [isMw, setIsMw] = useState(false);
  const [level, setLevel] = useState("B");
  const [maxPpl, setMaxPpl] = useState(false);
  const [submitUrl, setSubmitUrl] = useState("/submit-create-event");

  useEffect(() => {
    if (isEdit && !editData) {
      fetch("/api/v.1.0/event/" + eventId)
        .then(function (response) {
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
          setEditData(data);
          setTitle(data.title);
          setStartTime(new Date(data.start));
          setEndTime(new Date(data.end));
          setLocation(data.start_location);
          setDescription(data.generalInfo);
          setDistance(data.distance);
          setIsMw(data.isMw);
          setMaxPpl(data.maxPeople);
          setSubmitUrl(`/submit-edit-event/${eventId}`);
        });
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (
      startTime === false ||
      endTime === false ||
      title === false ||
      location === false ||
      distance === false ||
      description === false
    ) {
      setError("Visi laukai yra privalomi");
      return;
    }

    fetch(submitUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        type: type,
        startDate: new Date(startTime).toISOString(),
        endDate: new Date(endTime).toISOString(),
        startLocation: location,
        level: level,
        distance: distance,
        generalInfo: description,
        maxPeople: maxPpl,
        isMw: isMw,
      }),
    }).then(response => {
      navigate("/");
    });
  };

  return (
    <div className="container--lg">
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/event/add")}
      >
        Atgal viena žingsnį
      </Button>
      <h1 className="text-center">{`Kuriame dviraciu (${type})  treniruote`}</h1>
      {error && (
        <p className="bg-red-300 p-3 text-xl text-red-700 font-bold">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <div className="mt-5 w-full event-form-item">
            <TextField
              id="title"
              variant="outlined"
              label="Pavadinimas"
              onChange={e => setTitle(e.target.value)}
              value={title || ""}
            />
          </div>
          <div className="mt-5 w-full event-form-item">
            <label className="font-bold">Pradžios laikas</label>
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                padding: "14px",
              }}
            >
              <DatePicker
                selected={startTime}
                onChange={date => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Pradžios laikas"
                dateFormat="MMMM d, yyyy HH:mm"
              />
            </div>
          </div>
          <div className="mt-5 w-full event-form-item">
            <label className="font-bold">Pabaigos laikas</label>
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                padding: "14px",
              }}
            >
              <DatePicker
                selected={endTime}
                onChange={date => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Pradžios laikas"
                dateFormat="MMMM d, yyyy HH:mm"
              />
            </div>
          </div>
          <div className="mt-5 w-full event-form-item">
            <TextField
              id="location"
              variant="outlined"
              label="Susitikimo vieta"
              onChange={e => setLocation(e.target.value)}
              value={location || ""}
            />
          </div>
          <div className="mt-5 w-full event-form-item">
            <TextField
              id="distance"
              variant="outlined"
              label="Planuojama distancija (km)"
              onChange={e => setDistance(e.target.value)}
              value={distance || ""}
            />
          </div>
          <div className="mt-5 w-full event-form-item">
            <FormControl>
              <InputLabel id="level-helper-label">Lygis</InputLabel>
              <Select
                labelId="level-label"
                id="level"
                value={level}
                onChange={e => setLevel(e.target.value)}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mt-5 w-full event-form-item">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isMw}
                  onChange={e => setIsMw(!isMw)}
                  value={isMw}
                  color="primary"
                />
              }
              label="Tik MoreWatts"
            />
          </div>
          <div className="mt-5 w-full event-form-item">
            <TextField
              id="maxPpl"
              placeholder="Maksimalus dalyvių skaičius"
              onChange={e => setMaxPpl(e.target.value)}
              value={maxPpl || ""}
            />
          </div>
          <div className="mt-5 w-full event-form-item">
            <TextField
              placeholder="Trumpas aprašymas"
              multiline={true}
              rows={2}
              rowsMax={4}
              onChange={e => setDescription(e.target.value)}
              value={description || ""}
            />
          </div>
          <div className="mt-5 w-full event-form-item">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {isEdit ? "Atnaujinti" : "Sukurti"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

Bikes.propTypes = {
  type: PropTypes.string,
  isEdit: PropTypes.bool,
  eventId: PropTypes.string,
};

export default Bikes;
