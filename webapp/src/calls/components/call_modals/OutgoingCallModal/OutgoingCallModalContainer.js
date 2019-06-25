import { connect } from 'react-redux';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import CallModal from './OutgoingCallModal';

function mapStateToProps({ calls }) {
  return {
    callerName: calls.call.tempRemote ? calls.call.tempRemote.name : '',
    phoneNumber: calls.call.tempRemote ? calls.call.tempRemote.phoneNumber : ''
  };
}

export const CallModalContainer = connect(
  mapStateToProps,
  null
)(CallModal);

export default withPhoneService(CallModalContainer);
