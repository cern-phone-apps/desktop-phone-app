import { connect } from "react-redux";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import CallModal from "./OutgoingCallModal";

function mapStateToProps({ calls }) {
  return {
    recipientName: calls.call.recipient.name,
    phoneNumber: calls.call.recipient.phoneNumber
  };
}

export const CallModalContainer = connect(
  mapStateToProps,
  null
)(CallModal);

export default phoneService(CallModalContainer);