import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotConnectedScreen from './NotConnectedScreen';

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
