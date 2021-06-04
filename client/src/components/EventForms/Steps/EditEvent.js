import React, { useState, useEffect } from "react";

import "./index.css";

import Bikes from "./forms/bikes";
import Strength from "./forms/strength";
import Indoor from "./forms/indoor";
import Child from "./forms/child";

const EditEvent = () => {
  const [eventId, setEventId] = useState(
    window.location.pathname.split("/").pop()
  );
  const [type, setType] = useState(false);
  const [formNeeded, setFormNeeded] = useState(false);

  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    setType(searchParams.get("type"));

    if (!formNeeded && type) {
      switch (type.toLowerCase()) {
        case "mtb":
        case "road":
          setFormNeeded("bikes");
          break;

        case "strength":
          setFormNeeded("strength");
          break;

        case "indoor":
          setFormNeeded("indoor");
          break;

          case "child":
            setFormNeeded("child");
            break;

        default:
          setFormNeeded("bikes");
      }
    }
  }, [formNeeded, type]);

  if (formNeeded === "bikes" && eventId) {
    return <Bikes type={type} eventId={eventId} isEdit />;
  }

  if (formNeeded === "strength" && eventId) {
    return <Strength eventId={eventId} isEdit />;
  }

  if (formNeeded === "indoor" && eventId) {
    return <Indoor eventId={eventId} isEdit />;
  }

  if (formNeeded === "child" && eventId) {
    return <Child eventId={eventId} isEdit />;
  }

  return null;
};

export default EditEvent;
