import { connect } from 'react-redux';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import CallModal from './OutgoingCallModal';

function mapStateToProps({ calls }) {
  return {
    callerName: calls.call.tempCaller ? calls.call.tempCaller.name : '',
    phoneNumber: calls.call.tempCaller ? calls.call.tempCaller.phoneNumber : ''
  };
}

export const CallModalContainer = connect(
  mapStateToProps,
  null
)(CallModal);

export default withPhoneService(CallModalContainer);
