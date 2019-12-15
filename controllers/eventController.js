var express = require("express");
var eventModel = require("../models/event.js");
var event = require("../models/event.js");
var app = express();
var replacer = app.get("json replacer");
var spaces = app.get("json spaces");

module.exports.getAllEvents = (req, res) => {
  eventModel.event.find(function(err, events) {
    if (err) return console.log(err);

    const body = JSON.stringify(events, replacer, spaces);
    res.send(body);
  });
};

module.exports.getEvent = (req, res) => {
  eventModel.event.findById(req.params.id, function(err, event) {
    if (err) return console.log(err);

    res.send(event);
  });
};

module.exports.subscribe = (req, res) => {
  const subscriber = { name: req.body.userName };
  eventModel.event.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { subscribers: subscriber } },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    }
  );
};

module.exports.unsubscribe = (req, res) => {
  const subscriber = { name: req.body.userName };
  eventModel.event.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { subscribers: subscriber } },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    }
  );
};

//Helper function to handle event form submit.
module.exports.submitEventForm = (req, res, next) => {
  const event = new eventModel.event({
    title: req.body.title,
    start: req.body.startDate,
    end: req.body.endDate,
    allDay: false,
    type: req.body.type,
    city: req.body.city,
    level: req.body.level,
    speed: req.body.speed,
    start_location: req.body.startLocation,
    distance: req.body.distance,
    generalInfo: req.body.generalInfo,
    subscribers: [],
    markers: req.body.markers,
    maxPeople: req.body.maxPpl,
    isMw: req.body.isMw,
  });

  event.save(function(err) {
    if (err) {
      console.log(err);
      res.status(422).send(err);
      return;
    } else {
      res.send(200);
    }
  });
};
