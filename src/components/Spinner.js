import React from "react";
import PropTypes from "prop-types";
import "./Spinner.css";

export default function Spinner(props) {
  let width = props.width;
  let height = props.height;
  let mode = props.mode;
  return (
    <div className="spinnerClass" style={mode}>
      <div
        className="spinner-border"
        style={{ width: width, height: height }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow ms-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      ...
    </div>
  );
}
Spinner.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
Spinner.defaultProps = {
  width: "1rem",
  height: "1rem",
};
