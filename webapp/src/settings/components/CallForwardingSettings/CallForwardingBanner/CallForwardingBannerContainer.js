import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openSettingsModal } from 'settings/actions/modal';
import { bindActionCreators } from 'redux';
import { callForwardingActionFactory } from 'dial-core';
import config from 'config';
import CallForwardingBanner from './CallForwardingBanner';

const apiEndpoint = config.api.ENDPOINT;

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
      getCallForwardingStatus: callForwardingActionFactory(apiEndpoint, "desktop")
        .getCallForwardingStatus
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
