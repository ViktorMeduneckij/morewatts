import React from "react";
import PropTypes from "prop-types";

import distanceIcon from "../../../images/distance.svg";

const Distance = ({ distance }) => {
  return (
    <div className="Complexity flex items-center mb-3">
      <img
        src={distanceIcon}
        alt=""
        style={{ width: "30px", marginRight: "5px" }}
      />
      <div className="Distance">
        <span className="capitalize font-semibold">{`${distance} km`}</span>
      </div>
    </div>
  );
};

Distance.propTypes = {
  distance: PropTypes.number,
};

export default Distance;
