export const buildRecipient = (recipient) => {
  return {
    name: recipient.name,
    incoming: recipient.incoming,
    phoneNumber: recipient.phoneNumber,
    missed: recipient.missed,
    startTime: recipient.startTime
  }
}


export const getWindowTitle = (props) => {

  const {connected, onCall, calling} = props

  let title
  if (!connected) {
    title = 'You are disconnected'
  }
  if (connected) {
    title = 'Make a call'
  }
  if (calling) {
    title = 'Calling'
  }
  if (onCall) {
    title = 'On a call'
  }
  return title
}