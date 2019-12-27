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
import { Tooltip } from "@material-ui/core";

const IndoorTrefkeBg = require("../../../images/stakliuTrefke.jpg");
import mwBadge from "../../../images/mw_badge_big.png";

const Indoor = ({ data }) => {
  const heroStyle = {
    backgroundImage: `url(${IndoorTrefkeBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: isMobile ? "250px" : "500px",
  };

  return (
    data && (
      <>
        <Stripe background="linear-gradient(150deg, #f788ab 15%, #f7dce5 70%, #d1d1d1 94%)" />
        <div className="container--lg">
          <div className="Indoor">
            <div className="Indoor-Banner relative">
              <div style={heroStyle} />
              {data.isMw && (
                <Tooltip
                  title={
                    <span className="text-lg">
                      Treniruotė skirta MoreWatts nariams.
                    </span>
                  }
                  placement="left"
                >
                  <span
                    className="absolute "
                    style={{
                      zIndex: "1",
                      top: "20px",
                      right: "20px",
                    }}
                  >
                    <img src={mwBadge} alt="" style={{ maxHeight: "300px" }} />
                  </span>
                </Tooltip>
              )}
            </div>
            <h1 className="Indoor-title text-center my-6">{data.title}</h1>
            <div className="Indoor-info flex flex-col lg:flex-row">
              <div className="Indoor-info--left pr-6">
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
                <div className="Indoor-desciption mt-5">
                  <h3>Apie staklių treniruotes</h3>
                  <p>{DESCRIPTION}</p>
                </div>
              </div>
              <div className="Indoor-info--right" style={{ minWidth: "250px" }}>
                <Participants eventId={data._id} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

Indoor.propTypes = {
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

export default Indoor;
