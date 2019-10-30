import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotConnectedScreen from './NotConnectedScreen';
import dialBackendApi from 'services/api';
import { bindActionCreators } from 'redux';

function mapStateToProps({ auth, connection }) {
  return {
    isAuthenticated: auth.loggedIn,
    connected: connection.connected
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

export const NotConnectedScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotConnectedScreen);

export default withRouter(NotConnectedScreenContainer);
