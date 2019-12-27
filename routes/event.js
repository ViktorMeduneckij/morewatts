var eventController = require("../controllers/eventController.js");

//Handle routes.
module.exports = function(app) {
  app.get("/api/v.1.0/events", eventController.getAllEvents);
  app.post("/submit-create-event", eventController.submitEventForm);
  app.get("/api/v.1.0/event/:id", eventController.getEvent);
  app.post("/api/v.1.0/event/subscribe/:id", eventController.subscribe);
  app.post("/api/v.1.0/event/unsubscribe/:id", eventController.unsubscribe);
  app.get("/api/v.1.0/event/delete/:id", eventController.deleteEvent);
  app.post("/submit-edit-event/:id", eventController.submitEventEditForm);
};
