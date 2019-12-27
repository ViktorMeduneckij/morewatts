import React from "react";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import Location from "../../Event/subcomponents/Location";
import Type from "../../Event/subcomponents/Type";
import Participants from "../../Event/subcomponents/Participants";
import Stripe from "../../Stripe";
import TimeSpan from "../../Event/subcomponents/TimeSpan";

import { DESCRIPTION } from "./description.js";

const salesTrefkeBg = require("../../../images/salesTrefke.png");

const Strength = ({ data }) => {
  const heroStyle = {
    backgroundImage: `url(${salesTrefkeBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: isMobile ? "250px" : "500px",
  };

  return (
    data && (
      <>
        <Stripe background="linear-gradient(150deg,#FDB713 15%,#F5E663 70%,#a6ffcb 94%)" />
        <div className="container--lg">
          <div className="Strength">
            <div className="Strength-Banner" style={heroStyle}></div>
          </div>
          <h1 className="Strength-title text-center my-6">{data.title}</h1>
          <div className="Strength-info flex flex-col lg:flex-row">
            <div className="Strength-info--left pr-6">
              <Type type={data.type} />
              <TimeSpan start={data.start} end={data.end} />
              <Location address={data.start_location} />
              <div className="generalInfo">
                <p
                  className="text-justify"
                  dangerouslySetInnerHTML={{
                    __html: data.generalInfo,
                  }}
                />
              </div>
              <div className="Strength-desciption mt-5">
                <h3>Apie treniruotes saleje</h3>
                <p>{DESCRIPTION}</p>
              </div>
            </div>
            <div className="Strength-info--right" style={{ minWidth: "250px" }}>
              <Participants eventId={data._id} />
            </div>
          </div>
        </div>
      </>
    )
  );
};

Strength.propTypes = {
  data: PropTypes.shape({
    allDay: PropTypes.bool,
    city: PropTypes.string,
    distance: PropTypes.string,
    end: PropTypes.string,
    generalInfo: PropTypes.string,
    level: PropTypes.string,
    start: PropTypes.string,
    start_location: PropTypes.string,
    subscribers: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string,
    type: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default Strength;
