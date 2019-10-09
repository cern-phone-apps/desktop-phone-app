import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotConnectedScreen from './NotConnectedScreen';
import { bindActionCreators } from 'redux';
import { numbersActions } from 'dial-core';

function mapStateToProps({ auth, connection, numbers }) {
  return {
    isAuthenticated: auth.loggedIn,
    connected: connection.connected,
    numbers: numbers.numbers
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setActiveNumber: numbersActions.setActiveNumber
    },
    dispatch
  );
}

export const NotConnectedScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotConnectedScreen);

export default withRouter(NotConnectedScreenContainer);
