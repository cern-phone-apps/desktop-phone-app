import React from 'react';
import DetectRTC from 'detectrtc';
import { Button } from 'semantic-ui-react';

/**
 * Represents any Call Button
 * @param props
 * @returns {*}
 * @constructor
 */

export function CallButtonElement({ content, clickHandler, type }) {
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

  if (type === 'modal') {
    return (
      <Button
        fluid
        className="CalleeProfileNumber"
        onKeyPress={checkDevices}
        role="button"
        tabIndex={0}
        onClick={checkDevices}
      >
        {content}
      </Button>
    );
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
