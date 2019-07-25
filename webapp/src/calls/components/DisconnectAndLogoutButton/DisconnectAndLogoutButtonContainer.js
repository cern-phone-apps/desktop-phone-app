import { connect } from 'react-redux';

import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import { bindActionCreators } from 'redux';
import dialBackendApi from 'services/api';
import { DisconnectAndLogoutButton } from './DisconnectAndLogoutButton';

function mapStateToProps({ connection }) {
  return {
    connected: connection.connected,
    disconnecting: connection.disconnecting
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: dialBackendApi().logout
    },
    dispatch
  );
}

export const DisconnectNumberButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectAndLogoutButton);

export default withPhoneService(DisconnectNumberButtonContainer);
