import React from "react";
import PropTypes from "prop-types";

import Location from "../../Event/subcomponents/Location";
import Type from "../../Event/subcomponents/Type";
import Participants from "../../Event/subcomponents/Participants";

import { DESCRIPTION } from "./description.js";

const Strength = ({ data }) => {
  return (
    data && (
      <div className="container--lg">
        <div className="Strength">
          <div className="Strength-Banner">
            <img
              src={require("../../../images/salesTrefke.png")}
              alt=""
              style={{ maxHeight: "450px", boxShadow: "0px 0px 15px #fff" }}
              className="mx-auto"
            />
          </div>
          <h1 className="Strength-title text-center">{data.title}</h1>
          <div className="Strength-info flex flex-col lg:flex-row">
            <div className="Strength-info--left pr-6">
              <Type type={data.type} />
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
      </div>
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
    subscribers: PropTypes.arrayOf(),
    title: PropTypes.string,
    type: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default Strength;
