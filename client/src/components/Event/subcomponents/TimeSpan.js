import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import timeIcon from "../../../images/clock.svg";

const TimeSpan = ({ start, end }) => {
  const startTime = moment(start).format("HH:mm");

  const endTime = moment(end).format("HH:mm");

  return (
    <div className="TimeSpan flex items-center mb-3">
      <img
        src={timeIcon}
        alt=""
        style={{ width: "30px", marginRight: "5px" }}
      />
      <div className="Time font-semibold">
        <span>{`${startTime} - ${endTime}`}</span>
      </div>
    </div>
  );
};

TimeSpan.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
};

export default TimeSpan;
