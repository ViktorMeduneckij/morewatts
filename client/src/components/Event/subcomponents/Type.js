import React from "react";
import PropTypes from "prop-types";

import strengthIcon from "../../../images/strength.svg";
import roadIcon from "../../../images/racing.svg";

const Location = ({ type }) => {
  const resolveIcon = () => {
    switch (type) {
      case "strength":
        return strengthIcon;
      case "road":
        return roadIcon;
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
