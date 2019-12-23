import React, { useState, useEffect } from "react";

import "./index.css";

import Bikes from "./forms/bikes";
import Strength from "./forms/strength";
import Indoor from "./forms/indoor";

const NewEvent = () => {
  const [type, setType] = useState(window.location.pathname.split("/").pop());
  const [formNeeded, setFormNeeded] = useState(false);

  useEffect(() => {
    if (!formNeeded) {
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

        default:
          setFormNeeded("bikes");
      }
    }
  }, [formNeeded, type]);

  if (formNeeded === "bikes") {
    return <Bikes type={type} />;
  }

  if (formNeeded === "strength") {
    return <Strength />;
  }

  if (formNeeded === "indoor") {
    return <Indoor />;
  }

  return null;
};

export default NewEvent;
