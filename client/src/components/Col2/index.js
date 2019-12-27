import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./index.css";

const Col2 = ({ values }) => {
  const {
    className,
    leftImg,
    leftText,
    rightTitle,
    rightText,
    reverse,
  } = values;
  return (
    <div
      className={cx(
        "Col2 flex justify-center items-center",
        reverse
          ? "flex-col-reverse md:flex-row-reverse"
          : "flex-col md:flex-row ",
        className
      )}
    >
      {leftImg && (
        <div className="flex-1 Col-2-image">
          <img
            className={cx("Col2-image", reverse && "ml-auto")}
            src={require(`../../images/${leftImg.src}`)}
            alt=""
            style={{ maxHeight: leftImg.height, maxWidth: leftImg.width }}
          />
        </div>
      )}
      {leftText && (
        <div className={cx("flex-1", leftText.className)}>{leftText.text}</div>
      )}
      <div className="pl-4 flex-1">
        <h2 className="text-gray-700 font-semibold text-xl">{rightTitle}</h2>
        <div dangerouslySetInnerHTML={{ __html: rightText }} />
      </div>
    </div>
  );
};

Col2.propTypes = {
  values: PropTypes.shape({
    className: PropTypes.string,
    leftImg: PropTypes.shape({
      src: PropTypes.string,
      height: PropTypes.string,
      width: PropTypes.string,
    }),
    leftText: PropTypes.shape({
      text: PropTypes.string,
      className: PropTypes.string,
    }),
    rightTitle: PropTypes.string,
    rightText: PropTypes.string,
    reverse: PropTypes.bool,
  }),
};

export default Col2;
