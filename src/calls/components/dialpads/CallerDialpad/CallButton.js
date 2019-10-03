import PropTypes from 'prop-types';
import React from 'react';

/**
 * Represents the Call Button on the DialPad
 * @param props
 * @returns {*}
 * @constructor
 */

export function CallButton({ clickHandler, content }) {
  return (
    <div
      onKeyPress={clickHandler}
      className="DialButton CallButton"
      onClick={clickHandler}
      role="button"
      tabIndex={0}
    >
      <div className="DialButton__content">{content}</div>
    </div>
  );
}

CallButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default CallButton;
