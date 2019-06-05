import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActionFactory, callForwardingActions } from 'dial-core';
import { CallForwardingForm } from './CallForwardingForm';

function mapStateToProps({ callForwarding, calls }) {
  return {
    localForwardList: callForwarding.localForwardList,
    fetchingStatus: callForwarding.fetchingStatus,
    status: callForwarding.status,
    activeNumber: calls.numbers.activeNumber,
    lastOperationResult: callForwarding.lastOperationResult
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCallForwardingStatus: callForwardingActionFactory(
        process.env.REACT_APP_API_ENDPOINT
      ).getCallForwardingStatus,
      disableCallForwarding: callForwardingActionFactory(
        process.env.REACT_APP_API_ENDPOINT
      ).disableCallForwarding,
      enableSimultaneousRinging: callForwardingActionFactory(
        process.env.REACT_APP_API_ENDPOINT
      ).enableSimultaneousRinging,
      enableCallForwarding: callForwardingActionFactory(
        process.env.REACT_APP_API_ENDPOINT
      ).enableCallForwarding,
      clearLastOperation: callForwardingActions.clearLastOperation
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallForwardingForm);
