import { connect } from 'react-redux';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import OnCallDetails from './OnCallDetails';

function mapStateToProps({ calls }) {
  return {
    caller: calls.call.remote,
    receivingCall: calls.call.receivingCall,
    call: calls.call
  };
}

export const OnCallDetailsContainer = connect(
  mapStateToProps,
  null
)(OnCallDetails);

export default withPhoneService(OnCallDetailsContainer);
