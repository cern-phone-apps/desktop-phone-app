import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActions } from 'dial-core';
import dialBackendApi from 'services/api';
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
      getCallForwardingStatus: dialBackendApi.getCallForwardingStatus,
      disableCallForwarding: dialBackendApi.disableCallForwarding,
      enableSimultaneousRinging: dialBackendApi.enableSimultaneousRinging,
      enableCallForwarding: dialBackendApi.enableCallForwarding,
      clearLastOperation: callForwardingActions.clearLastOperation
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallForwardingForm);
