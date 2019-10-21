import { errorMessage, logMessage, warnMessage } from 'common/utils/logs';
/**
 * Generates the constraints that will be passed to getUserMedia WebRTC method
 * @param sourceId Identifier of the device that will be set
 * @returns {{audio: {deviceId: *}, video: boolean}}
 */
function buildConstraints(sourceId = null) {
  const device = sourceId ? { exact: sourceId } : undefined;
  return {
    audio: { deviceId: device },
    video: false
  };
}

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  return deviceInfos.map((device, index) => {
    const value = device.deviceId;
    if (device.kind === 'audioinput') {
      const text = device.label || `microphone${index}`;
      return { value: value, text: text, kind: 'audioinput' };
    } else if (device.kind === 'audiooutput') {
      const text = device.label || `speaker${index}`;
      return { value: value, text: text, kind: 'audiooutput' };
    } else {
      const text = device.label || `other${index}`;
      return { value: value, text: text, kind: 'other' };
    }
  });
}

export function getUserDevices() {
  return navigator.mediaDevices
    .enumerateDevices()
    .then(gotDevices)
    .catch(handleError);
}

export function changeInputDevice(inputSourceId = null) {
  navigator.mediaDevices
    .getUserMedia(buildConstraints(inputSourceId))
    .then(gotStream)
    .then(getUserDevices)
    .catch(handleError);
}

function handleError(error) {
  errorMessage('navigator.getUserMedia error: ', error);
}

export function stopStreams() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
}

function gotStream(stream) {
  logMessage('Got stream ', stream);
  let audio = document.querySelector('audio');
  window.stream = stream; // make stream available to console
  if (audio) {
    audio.srcObject = stream;
  }
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

/**
 * This function will set the audio output of the application to the
 * selected device.
 * @param sinkId The id of the device that will be set.
 */
export function changeRingToneDestination(sinkId) {
  /**
   * We need to loop through all the different application's audio inputs
   * in order to configure their sound.
   * @type {string[]}
   */
  let audioIds = ['ringbackTone', 'ringTone'];
  let elements = audioIds.map(value => document.getElementById(value));

  elements.forEach(element => {
    if (!element) {
      warnMessage('Audio element does not exist.');
      return;
    }
    logMessage('sinkId:', sinkId);

    if (typeof element.sinkId !== 'undefined') {
      element
        .setSinkId(sinkId)
        .then(function() {
          logMessage('Success, audio output device attached: ' + sinkId);
        })
        .catch(function(error) {
          let message = error;
          if (error.name === 'SecurityError') {
            message =
              'You need to use HTTPS for selecting audio output ' +
              'device: ' +
              error;
          }
          errorMessage(message);
          // Jump back to first output device in the list as it's the default.
          // audioOutputSelect.selectedIndex = 0
        });
    } else {
      warnMessage(
        'Browser does not support output device selection. If using Chrome, it needs an audio or video element'
      );
    }
  });
}

/**
 * This function will set the audio output of the application to the
 * selected device.
 * @param sinkId The id of the device that will be set.
 */
export function changeAudioDestination(sinkId) {
  /**
   * We need to loop through all the different application's audio inputs
   * in order to configure their sound.
   * @type {string[]}
   */
  let audioIds = ['callsAudioInput'];
  let elements = audioIds.map(value => document.getElementById(value));

  elements.forEach(element => {
    if (!element) {
      warnMessage('Audio element does not exist.');
      return;
    }
    logMessage('sinkId:', sinkId);

    if (typeof element.sinkId !== 'undefined') {
      element
        .setSinkId(sinkId)
        .then(function() {
          logMessage('Success, audio output device attached: ' + sinkId);
        })
        .catch(function(error) {
          let message = error;
          if (error.name === 'SecurityError') {
            message =
              'You need to use HTTPS for selecting audio output ' +
              'device: ' +
              error;
          }
          errorMessage(message);
          // Jump back to first output device in the list as it's the default.
          // audioOutputSelect.selectedIndex = 0
        });
    } else {
      warnMessage(
        'Browser does not support output device selection. If using Chrome, it needs an audio or video element'
      );
    }
  });
}
