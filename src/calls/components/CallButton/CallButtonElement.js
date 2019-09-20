import React, { useState } from 'react';
import DetectRTC from 'detectrtc';

/**
 * Represents any Call Button
 * @param props
 * @returns {*}
 * @constructor
 */

function checkDevices(handler) {
    if (DetectRTC.hasSpeakers && DetectRTC.hasMicrophone) {
        handler();
    } else {
        alert("There are no input/output devices.\nPlease connect at least one speaker and one microphone and select them in settings.");
    }
}

export function CallButtonElement(text, style, onClick) {
    return (<div style={style} onClick={() => checkDevices(onClick)}>{text}</div>);
}
