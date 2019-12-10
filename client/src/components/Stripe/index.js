import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const Stripe = ({ background }) => (
  <div className="Stripe" aria-hidden="true" style={{ background: background }}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
);

Stripe.propTypes = {
  background: PropTypes.string,
};

export default Stripe;
