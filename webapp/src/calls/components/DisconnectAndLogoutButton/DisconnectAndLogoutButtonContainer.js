import { connect } from 'react-redux';

import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import { bindActionCreators } from 'redux';
import { authActionFactory } from 'dial-core';
import config from 'config';
import { DisconnectAndLogoutButton } from './DisconnectAndLogoutButton';

const apiEndpoint = config.api.ENDPOINT;

function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    disconnecting: calls.connection.disconnecting
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: authActionFactory(apiEndpoint, "desktop").logout
    },
    dispatch
  );
}

export const DisconnectNumberButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectAndLogoutButton);

export default withPhoneService(DisconnectNumberButtonContainer);
