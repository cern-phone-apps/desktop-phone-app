export const buildRecipient = (recipient) => {
  return {
    name: recipient.name,
    incoming: recipient.incoming,
    phoneNumber: recipient.phoneNumber,
    missed: recipient.missed,
    startTime: recipient.startTime,
  }
}