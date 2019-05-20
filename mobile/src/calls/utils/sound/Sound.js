const Sound = require('react-native-sound');

let sound;

export function playMakingCallTone() {
  sound = new Sound('ringbacktone.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
    } else {
      sound.play();
      sound.setNumberOfLoops(-1);
    }
  });
}

export function playReceivingCallTone() {
  sound = new Sound('ringtone.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
    } else {
      sound.play();
      sound.setNumberOfLoops(-1);
    }
  });
}

export function stop() {
  sound.stop();
}
