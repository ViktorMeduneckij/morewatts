import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./index.css";

const Hero = ({ src, overlay, title, subtitle }) => {
  return (
    <div className={cx("Hero relative", overlay && "with-overlay")}>
      <picture>
        <img src={src} alt="hero"></img>
      </picture>
      <div
        className="absolute z-10 w-full text-center"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <h1
          className="text-white text-5xl uppercase"
          style={{
            color: "#fdb713",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

Hero.propTypes = {
  src: PropTypes.string,
  overlay: PropTypes.bool,
  title: PropTypes.string,
};

export default Hero;
