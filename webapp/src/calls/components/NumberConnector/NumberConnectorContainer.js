import { connect } from 'react-redux';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import { bindActionCreators } from 'redux';

import { numbersActions } from 'dial-core';

import * as setttingsActions from 'settings/actions/settings';

import dialBackendApi from 'services/api';
import NumberConnector from './NumberConnector';

function mapStateToProps({ auth, numbers, connection, settings }) {
  return {
    activeNumber: numbers.activeNumber,
    connecting: connection.connecting,
    numbers: numbers.numbers,
    rememberNumber: settings.settings.rememberNumber
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
