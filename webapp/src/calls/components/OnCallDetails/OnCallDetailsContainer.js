import { connect } from 'react-redux';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import OnCallDetails from './OnCallDetails';

function mapStateToProps({ call }) {
  return {
    caller: call.remote,
    receivingCall: call.receivingCall,
    call
  };
}

export const OnCallDetailsContainer = connect(
  mapStateToProps,
  null
)(OnCallDetails);

export default withPhoneService(OnCallDetailsContainer);
