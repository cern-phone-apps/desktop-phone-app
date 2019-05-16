export const TOGGLE_DIALPAD = '@@dialpad/TOGGLE';
export const DIALPAD_NUMBER_UPDATED = '@@dialpad/DIALPAD_NUMBER_UPDATED';

/**
 * Action that is triggered when the Keypad changes to visible to hidden or vice versa
 *
 * @param newStatus A boolean with the new status
 * @returns {{newStatus: *, type: string}} A dict with the action information
 */
export function toggleDialpad(newStatus) {
  return {
    newStatus,
    type: TOGGLE_DIALPAD
  };
}

export function updateDialpadValue(newValue) {
  return {
    newValue,
    type: DIALPAD_NUMBER_UPDATED
  };
}
