/**
 * Creates a recipient
 * @param recipient
 * @returns {{name: *, incoming: *, phoneNumber: *, missed: *, startTime: *}}
 */
export const buildRecipient = recipient => {
  return {
    name: recipient.name,
    incoming: recipient.incoming,
    phoneNumber: recipient.phoneNumber,
    missed: recipient.missed,
    startTime: recipient.startTime
  };
};

/**
 * Sets the different titles for the Calls Screen based on the
 * current status of the application.
 * @param props
 * @returns {*}
 */
export const getWindowTitle = props => {
  const { connected, onCall, calling } = props;

  let title;
  if (!connected) {
    title = "You are disconnected";
  }
  if (connected) {
    title = "Make a call";
  }
  if (calling) {
    title = "Calling";
  }
  if (onCall) {
    title = "On a call";
  }
  return title;
};
