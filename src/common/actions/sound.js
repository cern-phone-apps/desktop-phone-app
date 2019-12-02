export const RINGTONE = 'RINGTONE';
export const RINGBACKTONE = 'RINGBACKTONE';

export function ringTone(enable) {
  return {
    type: RINGTONE,
    enable
  };
}

export function ringBackTone(enable) {
  return {
    type: RINGBACKTONE,
    enable
  };
}
