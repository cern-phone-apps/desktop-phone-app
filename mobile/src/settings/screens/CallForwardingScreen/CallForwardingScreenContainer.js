import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActionFactory } from 'dial-core';
import { API_ENDPOINT } from 'react-native-dotenv';
import CallForwardingScreen from './CallForwardingScreen';

function mapStateToProps({ calls, callForwarding }) {
  return {
    activeNumber: calls.numbers.activeNumber,
    callForwardingStatus: callForwarding.status['call-forwarding'],
    simultaneousRingingStatus: callForwarding.status['simultaneous-ring'],
    destinationList: callForwarding.status['destination-list']
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCallForwardingStatus: callForwardingActionFactory(
        API_ENDPOINT,
        'mobile'
      ).getCallForwardingStatus
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallForwardingScreen);
