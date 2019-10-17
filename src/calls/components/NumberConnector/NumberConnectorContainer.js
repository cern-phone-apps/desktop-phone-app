import { connect } from 'react-redux';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import { bindActionCreators } from 'redux';
import {
  numbersActions,
  getFirstNumberAvailable,
  getNumberOfPhoneNumbers
} from 'dial-core';
import * as setttingsActions from 'settings/actions/settings';
import dialBackendApi from 'services/api';
import NumberConnector from './NumberConnector';

function mapStateToProps({ numbers, connection, settings }) {
  return {
    activeNumber: numbers.activeNumber,
    numbers: numbers.numbers,
    connecting: connection.connecting,
    error: connection.error.message,
    firstNumberAvailable: getFirstNumberAvailable(numbers)(),
    numberOfMobileNumbers: getNumberOfPhoneNumbers(numbers)(),
    rememberNumber: settings.settings.rememberNumber,
    onlineStatus: settings.settings.onlineStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserPhoneNumbers: dialBackendApi().getUserPhoneNumbers,
      setActiveNumber: numbersActions.setActiveNumber,
      setRememberNumber: setttingsActions.setRememberNumber
    },
    dispatch
  );
}

export const NumberConnectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberConnector);

export default withPhoneService(NumberConnectorContainer);
