import PropTypes from "prop-types";
import React from "react";

/**
 * Represents the Call Button on the DialPad
 * @param props
 * @returns {*}
 * @constructor
 */
export function CallButton ({ clickHandler, text }) {
  return (
    <div className={"DialButton CallButton"} onClick={() => clickHandler()}>
      <div className={"DialButton__content"}>{text}</div>
    </div>
  );
}

CallButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired
};