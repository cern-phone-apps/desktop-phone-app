import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callActions } from 'dial-core';

import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import IncomingCallModal from './IncomingCallModal';
/**
 * Mapping the props to the container
 * @param calls
 * @returns {{connected: *, receivingCall: boolean, callerName: *, callerNumber: *}}
 */
function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    receivingCall: calls.call.receivingCall,
    callerName: calls.call.tempCaller
      ? calls.call.tempCaller.callerName
      : '',
    callerNumber: calls.call.tempCaller
      ? calls.call.tempCaller.phoneNumber
      : ''
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setIsReceivingCall: callActions.setIsReceivingCall,
      rejectIncomingCall: callActions.rejectIncomingCall
    },
    dispatch
  );
}

/**
 * Redux connected Container for CallingModal
 */
export const IncomingCallModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IncomingCallModal);

/**
 * Default export is binds phoneService
 */
export default withPhoneService(IncomingCallModalContainer);
