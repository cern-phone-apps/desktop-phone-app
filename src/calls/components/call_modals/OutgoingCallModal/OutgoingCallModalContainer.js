import { connect } from 'react-redux';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import CallModal from './OutgoingCallModal';

function mapStateToProps({ call }) {
  return {
    callerName: call.tempRemote ? call.tempRemote.name : '',
    phoneNumber: call.tempRemote ? call.tempRemote.phoneNumber : ''
  };
}

export const CallModalContainer = connect(
  mapStateToProps,
  null
)(CallModal);

export default withPhoneService(CallModalContainer);
