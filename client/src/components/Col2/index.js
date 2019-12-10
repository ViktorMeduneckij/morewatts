import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Col2 = ({ values }) => {
  const { className, leftImg, rightTitle, rightText } = values;
  return (
    <div
      className={cx(
        "Col2 flex flex-col md:flex-row justify-center items-center",
        className
      )}
    >
      {leftImg && (
        <div className="flex-1">
          <img
            className="Col2-image"
            src={require(`../../images/${leftImg.src}`)}
            alt=""
            style={{ maxHeight: leftImg.height, maxWidth: leftImg.width }}
          />
        </div>
      )}
      <div className="pl-4 flex-1">
        <h2 className="text-gray-700 font-semibold text-xl">{rightTitle}</h2>
        <div>{rightText}</div>
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
    rightTitle: PropTypes.string,
    rightText: PropTypes.string,
  }),
};

export default Col2;
