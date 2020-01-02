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
      <a
        href={`https://maps.google.com/?q=${address}`}
        className="capitalize font-semibold cursor-pointer underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {address}
      </a>
    </div>
  );
};

Location.propTypes = {
  address: PropTypes.string,
};

export default Location;
