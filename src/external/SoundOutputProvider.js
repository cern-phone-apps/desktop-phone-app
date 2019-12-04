import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';

const repeat = function() {
  this.currentTime = 0;
  this.play();
};

const routeRingBackTone = `${process.env.PUBLIC_URL}/sounds/ringbacktone.wav`;
const routeRingTone = `${process.env.PUBLIC_URL}/sounds/ringtone.wav`;
const ringToneAudio = new Audio(routeRingTone);
const ringBackToneAudio = new Audio(routeRingBackTone);
ringToneAudio.addEventListener('ended', repeat, false);
ringBackToneAudio.addEventListener('ended', repeat, false);

export const SoundOutputProvider = ({
  ringTone,
  ringBackTone,
  outputDevice
}) => {
  if (outputDevice != null) {
    ringToneAudio.setSinkId(outputDevice);
    ringBackToneAudio.setSinkId(outputDevice);
  }

  if (ringTone) {
    ringToneAudio.play();
  } else {
    ringToneAudio.pause();
  }

  if (ringBackTone) {
    ringBackToneAudio.play();
  } else {
    ringBackToneAudio.pause();
  }

  return <></>;
};

function mapStateToProps({ common, settings }) {
  return {
    ringTone: common.sound ? common.sound.ringTone : false,
    ringBackTone: common.sound ? common.sound.ringBackTone : false,
    outputDevice: settings.devices
      ? settings.devices.speakerRingtone
      : undefined
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundOutputProvider);
