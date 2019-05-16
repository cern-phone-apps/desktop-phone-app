import { connect } from "react-redux";
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
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

export default withPhoneService(CallModalContainer);