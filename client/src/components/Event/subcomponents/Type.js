import React from "react";
import PropTypes from "prop-types";

import strengthIcon from "../../../images/strength.svg";
import roadIcon from "../../../images/racing.svg";
import mtbIcon from "../../../images/mtb.svg";
import indoorIcon from "../../../images/stakles.svg";

const Location = ({ type }) => {
  const resolveIcon = () => {
    switch (type) {
      case "strength":
        return strengthIcon;
      case "road":
        return roadIcon;
      case "mtb":
        return mtbIcon;
      case "indoor":
        return indoorIcon;
      default:
        return roadIcon;
    }
  };
  return (
    <div className="Type flex items-center mb-3">
      <div className="type-icon">
        <img
          src={resolveIcon()}
          alt=""
          style={{ width: "30px", marginRight: "5px" }}
        />
      </div>
      <p className="capitalize font-semibold">{type}</p>
    </div>
  );
};

Location.propTypes = {
  type: PropTypes.string,
};

export default Location;
