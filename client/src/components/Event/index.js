import React, { useState, useEffect } from "react";
import { canUseDOM } from "exenv";

import Header from "../Header";
import Strength from "../EventPool/Strength";
import Road from "../EventPool/Road";
import Mtb from "../EventPool/Mtb";
import Indoor from "../EventPool/Indoor";

const Event = () => {
  const [data, setData] = useState(false);
  const [type, setType] = useState(false);

  useEffect(() => {
    if (canUseDOM && !data) {
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
        setData(data);
        setType(data.type);
      });
  };

  const renderEvent = () => {
    console.log(type);

    switch (type) {
      case "strength":
        return <Strength data={data} />;

      case "road":
        return <Road data={data} />;

      case "mtb":
        return <Mtb data={data} />;

      case "indoor":
        return <Indoor data={data} />;

      default:
        return <Strength data={data} />;
    }
  };

  return (
    data &&
    type && (
      <>
        <Header />
        {renderEvent()}
      </>
    )
  );
};

export default Event;
