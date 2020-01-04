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

const plentoTrefkeBg = require("../../../images/salesTrefke.png");

const Road = ({ data }) => {
  const heroStyle = {
    backgroundImage: `url(${plentoTrefkeBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: isMobile ? "250px" : "500px",
  };

  return (
    data && (
      <>
        <Stripe background="linear-gradient(150deg, #3F8EFC 15%, #ADD7F6 70%, #AFAFDC 94%)" />
        <div className="container--lg">
          <div className="Road">
            <div className="Road-Banner" style={heroStyle}></div>
            <h1 className="Road-title text-center my-6">{data.title}</h1>
            <div className="Road-info flex flex-col lg:flex-row">
              <div className="Road-info--left pr-6">
                <Type type={data.type} />
                <TimeSpan start={data.start} end={data.end} />
                {data.start_location && (
                  <Location address={data.start_location} />
                )}
                {data.level && <Complexity level={data.level} />}
                <div className="generalInfo">
                  <p
                    className="text-justify"
                    dangerouslySetInnerHTML={{
                      __html: data.generalInfo,
                    }}
                  />
                </div>
                <div className="Road-desciption mt-5">
                  <h3 className="font-bold">Apie treniruotes plente</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DESCRIPTION,
                    }}
                  />
                </div>
              </div>
              <div className="Road-info--right" style={{ minWidth: "250px" }}>
                <Participants eventId={data._id} isMw={data.isMw} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

Road.propTypes = {
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

export default Road;
