import React from "react";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import Location from "../../Event/subcomponents/Location";
import Type from "../../Event/subcomponents/Type";
import Participants from "../../Event/subcomponents/Participants";
import TimeSpan from "../../Event/subcomponents/TimeSpan";
import Complexity from "../../Event/subcomponents/Complexity";
import { DESCRIPTION } from "./description.js";
import Stripe from "../../Stripe";

const mtbTrefkeBg = require("../../../images/salesTrefke.png");

const Mtb = ({ data }) => {
  const heroStyle = {
    backgroundImage: `url(${mtbTrefkeBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: isMobile ? "250px" : "500px",
  };

  return (
    data && (
      <>
        <Stripe background="linear-gradient(150deg, #12b53b 15%, #baf5c9 70%, #f5d9b3 94%)" />
        <div className="container--lg">
          <div className="Mtb">
            <div className="Mtb-Banner" style={heroStyle}></div>
            <h1 className="Mtb-title text-center my-6">{data.title}</h1>
            <div className="Mtb-info flex flex-col lg:flex-row">
              <div className="Mtb-info--left pr-6">
                <Type type={data.type} />
                <TimeSpan start={data.start} end={data.end} />
                <Location address={data.start_location} />
                <Complexity level={data.level} />
                <div className="generalInfo">
                  <p
                    className="text-justify"
                    dangerouslySetInnerHTML={{
                      __html: data.generalInfo,
                    }}
                  />
                </div>
                <div className="Mtb-desciption mt-5">
                  <h3>Apie MTB treniruotes</h3>
                  <p>{DESCRIPTION}</p>
                </div>
              </div>
              <div className="Mtb-info--right" style={{ minWidth: "250px" }}>
                <Participants eventId={data._id} isMw={data.isMw} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

Mtb.propTypes = {
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

export default Mtb;
