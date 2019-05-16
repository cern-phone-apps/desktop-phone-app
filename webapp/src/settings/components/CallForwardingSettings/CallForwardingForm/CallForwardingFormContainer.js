import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActionFactory, callForwardingActions } from 'dial-core';
import { CallForwardingForm } from './CallForwardingForm';

function mapStateToProps({ callForwarding }) {
  return {
    localForwardList: callForwarding.localForwardList,
    fetchingStatus: callForwarding.fetchingStatus,
    status: callForwarding.status
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addLocalForwardNumber: callForwardingActions.addLocalForwardNumber,
      getCallForwardingStatus: callForwardingActionFactory(
        process.env.REACT_APP_API_ENDPOINT
      ).getCallForwardingStatus
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallForwardingForm);
