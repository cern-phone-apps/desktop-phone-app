/**
 * Creates a caller
 * @param caller
 * @returns {{name: *, incoming: *, phoneNumber: *, missed: *, startTime: *}}
 */
export const buildcaller = caller => ({
  name: caller.name,
  incoming: caller.incoming,
  phoneNumber: caller.phoneNumber,
  missed: caller.missed,
  startTime: caller.startTime
});
/**
 * Sets the different titles for the Calls Screen based on the
 * current status of the application.
 * @param props
 * @returns {*}
 */
export const getWindowTitle = (connected, onCall, calling) => {
  let title;
  if (!connected) {
    title = 'You are disconnected';
  }
  if (connected) {
    title = 'Make a call';
  }
  if (calling) {
    title = 'Calling';
  }
  if (onCall) {
    title = 'On a call';
  }
  return title;
};

export function formatPhoneNumber(phoneNumber) {
  return phoneNumber
    .replace('+', '00')
    .replace(/ /g, '')
    .replace('.', '')
    .replace('-', '');
}
