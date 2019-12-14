import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { isMobile } from "react-device-detect";

import "./index.css";

const Hero = ({ src, overlay, title, subtitle }) => {
  const heroStyle = {
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: isMobile ? "250px" : "500px",
  };
  return (
    <div
      className={cx("Hero relative", overlay && "with-overlay")}
      style={heroStyle}
    >
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
        <h2
          className="text-white text-2xl uppercase"
          style={{
            color: "#fdb713",
          }}
        >
          {subtitle}
        </h2>
      </div>
    </div>
  );
};

Hero.propTypes = {
  src: PropTypes.string,
  overlay: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Hero;
