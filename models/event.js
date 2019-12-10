var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  allDay: { type: Boolean },
  type: { type: String },
  city: {
    type: String,
    validate: function(value) {
      return /^[a-zA-Z\s]*$/.test(value);
    }
  },
  level: { type: String},
  speed: { type: Number },
  start_location: { type: String },
  distance: { type: Number },
  subscribers: { type: Array },
  generalInfo: { type: String },
  markers: { type: Array },
  maxPeople: {type: Number},
  isMw: {type: Boolean},
});

var Event = mongoose.model("Event", eventSchema);

module.exports.eventSchema = eventSchema;
module.exports.event = Event;
