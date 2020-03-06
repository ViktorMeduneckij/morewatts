import React from "react";
import PropTypes from "prop-types";

import complexityIcon from "../../../images/podium.svg";

const Complexity = ({ level }) => {
  return (
    <div className="Complexity flex items-center mb-3">
      <img
        src={complexityIcon}
        alt=""
        style={{ width: "30px", marginRight: "5px" }}
      />
      <div className="Level flex">
        <span className="capitalize font-semibold mr-1">{level}</span>
        <span>sunkumas</span>
      </div>
    </div>
  );
};

Complexity.propTypes = {
  level: PropTypes.string,
};

export default Complexity;
