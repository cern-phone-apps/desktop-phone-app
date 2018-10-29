import { connect } from "react-redux";
import CallLoader from "calls/components/CallLoader/CallLoader";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";

function mapStateToProps({ calls }) {
  return {
    recipientName: calls.call.recipient.name,
    phoneNumber: calls.call.recipient.phoneNumber
  };
}

export const CallLoaderContainer = connect(
  mapStateToProps,
  null
)(CallLoader);

export default phoneService(CallLoaderContainer);
