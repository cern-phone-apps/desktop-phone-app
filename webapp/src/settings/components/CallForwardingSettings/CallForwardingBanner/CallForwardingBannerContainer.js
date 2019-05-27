import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openSettingsModal } from 'settings/actions/modal';
import { bindActionCreators } from 'redux';
import { callForwardingActionFactory } from 'dial-core';
import CallForwardingBanner from './CallForwardingBanner';

function mapStateToProps({ callForwarding, calls }) {
  return {
    status: callForwarding.status,
    activeNumber: calls.numbers.activeNumber
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openSettingsModal,
      getCallForwardingStatus: callForwardingActionFactory(
        process.env.REACT_APP_API_ENDPOINT
      ).getCallForwardingStatus
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CallForwardingBanner)
);
