import { connect } from 'react-redux';
import { meActionFactory } from 'dial-core';

import { withPhoneService } from 'calls/providers/PhoneProvider/PhoneService';
import { bindActionCreators } from 'redux';
import config from 'config';
import ConnectionStatusModal from './ConnectionStatusModal';

const apiEndpoint = config.api.ENDPOINT;

function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    activeNumber: calls.numbers.activeNumber,
    doNotDisturb: calls.status.doNotDisturb
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setUserDoNotDisturb: meActionFactory(apiEndpoint, "desktop").setUserDoNotDisturb,
      getMe: meActionFactory(apiEndpoint, "desktop").getMe
    },
    dispatch
  );
}

export const ConnectionStatusModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionStatusModal);

export const ConnectionStatusModalContainerWithPhoneService = withPhoneService(
  ConnectionStatusModalContainer
);

export default ConnectionStatusModalContainerWithPhoneService;
