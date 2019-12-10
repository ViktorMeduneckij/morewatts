import React from "react";

import spinnerIcon from "../../images/loading.gif";

const LoadingSpinner = ({ type }) => {
  return (
    <div className="LoadingSpinner">
      <img src={spinnerIcon} style={{ width: "40px", height: "40px" }} />
    </div>
  );
};

export default LoadingSpinner;
