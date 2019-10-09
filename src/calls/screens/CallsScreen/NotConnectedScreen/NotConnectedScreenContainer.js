import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import NotConnectedScreen from './NotConnectedScreen';
import { bindActionCreators } from 'redux';
import {
  numbersActions,
  getFirstNumberAvailable,
  getNumberOfMobileNumbers
} from 'dial-core';

function mapStateToProps({ auth, connection, numbers }) {
  return {
    isAuthenticated: auth.loggedIn,
    connected: connection.connected,
    numbers: numbers.numbers,
    numberOfMobileNumbers: getNumberOfMobileNumbers(numbers)(),
    firstNumberAvailable: getFirstNumberAvailable(numbers)()
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

export default withPhoneService(withRouter(NotConnectedScreenContainer));
