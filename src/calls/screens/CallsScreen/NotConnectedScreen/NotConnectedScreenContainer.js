import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotConnectedScreen from './NotConnectedScreen';
import { bindActionCreators } from 'redux';
import { numbersActions } from 'dial-core';

function mapStateToProps({ auth, connection }) {
  return {
    isAuthenticated: auth.loggedIn,
    connected: connection.connected
  };
}

export const NotConnectedScreenContainer = connect(mapStateToProps)(
  NotConnectedScreen
);

export default withRouter(NotConnectedScreenContainer);
