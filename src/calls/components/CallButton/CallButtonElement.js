import React from 'react';
import DetectRTC from 'detectrtc';

/**
 * Represents any Call Button
 * @param props
 * @returns {*}
 * @constructor
 */

export function CallButtonElement({ content, clickHandler }) {
  function checkDevices() {
    DetectRTC.load(() => {
      if (DetectRTC.hasMicrophone && DetectRTC.hasSpeakers) {
        clickHandler();
      } else {
        alert(
          'There are no input/output devices.\nPlease connect at least one speaker and one microphone to perform phone calls.'
        );
      }
    });
  }

  return (
    <div
      onKeyPress={checkDevices}
      className="DialButton CallButton"
      role="button"
      tabIndex={0}
      onClick={checkDevices}
    >
      <div className="DialButton__content">{content}</div>
    </div>
  );
}
