import React from "react";
import PropTypes from "prop-types";

import typeIcon from "../../../images/strength.svg";

const Location = ({ type }) => {
  return (
    <div className="Type flex items-center mb-3">
      <div className="Strength-icon">
        <img
          src={typeIcon}
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
