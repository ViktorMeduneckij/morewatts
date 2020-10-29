import React from "react";
import PropTypes from "prop-types";

import locationIcon from "../../../images/location.svg";

const Location = ({ address }) => {
  return (
    <div className="Location flex items-center mb-3">
      <img
        src={locationIcon}
        alt=""
        style={{ width: "30px", marginRight: "5px" }}
      />
      <div>
        {address}
      </div>
    </div>
  );
};

Location.propTypes = {
  address: PropTypes.string,
};

export default Location;
