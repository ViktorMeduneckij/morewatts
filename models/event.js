var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: { type: String },
  start: { type: String },
  end: { type: String },
  allDay: { type: Boolean },
  type: { type: String },
  city: { type: String },
  level: { type: String },
  speed: { type: Number },
  start_location: { type: String },
  distance: { type: Number },
  subscribers: { type: Array },
  generalInfo: { type: String },
  markers: { type: Array },
  maxPeople: { type: Number },
  isMw: { type: Boolean },
});

var Event = mongoose.model("Event", eventSchema);

module.exports.eventSchema = eventSchema;
module.exports.event = Event;
