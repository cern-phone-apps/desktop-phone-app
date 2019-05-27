export function buildDropdownOptionsArray(stringValue) {
  return stringValue.map(value => ({ text: value, value }));
}

export function getRadioButtonValue(callForwardingStatus, simultaneousRingingStatus) {
  let forwardStatus = 'disabled';
  if (callForwardingStatus) {
    forwardStatus = 'forward';
  }
  if (simultaneousRingingStatus) {
    forwardStatus = 'simultaneous';
  }
  return forwardStatus;
}
