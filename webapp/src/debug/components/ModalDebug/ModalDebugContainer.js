import { connect } from 'react-redux';

import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import ModalDebug from './ModalDebug';

function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    connecting: calls.connection.connecting,
    disconnecting: calls.connection.disconnecting
  };
}

export const ModalDebugConnected = connect(
  mapStateToProps,
  null
)(ModalDebug);

export default withPhoneService(ModalDebugConnected);
