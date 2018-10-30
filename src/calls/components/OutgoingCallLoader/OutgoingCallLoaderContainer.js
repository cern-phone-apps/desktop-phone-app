import { connect } from "react-redux";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import OutgoingCallLoader  from "calls/components/OutgoingCallLoader/OutgoingCallLoader";

function mapStateToProps({ calls }) {
  return {
    recipientName: calls.call.recipient.name,
    phoneNumber: calls.call.recipient.phoneNumber
  };
}

export const OutgoingCallLoaderContainer = connect(
  mapStateToProps,
  null
)(OutgoingCallLoader);

export default phoneService(OutgoingCallLoaderContainer);
