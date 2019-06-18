const Sound = require('react-native-sound');

let sound;

export function playRingTone() {
  sound = new Sound('ringbacktone.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
    } else {
      sound.play();
      sound.setNumberOfLoops(-1);
    }
  });
}

export function playRingbackTone() {
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
