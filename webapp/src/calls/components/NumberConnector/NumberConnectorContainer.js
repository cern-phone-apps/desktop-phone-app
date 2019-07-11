import { connect } from 'react-redux';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import { bindActionCreators } from 'redux';

import { numbersActionFactory, numbersActions } from 'dial-core';

import * as setttingsActions from 'settings/actions/settings';

import config from 'config';
import NumberConnector from './NumberConnector';

const apiEndpoint = config.api.ENDPOINT;

function mapStateToProps({ auth, calls, settings }) {
  return {
    activeNumber: calls.numbers.activeNumber,
    connecting: calls.connection.connecting,
    numbers: calls.numbers.numbers,
    rememberNumber: settings.settings.rememberNumber
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserPhoneNumbers: numbersActionFactory(apiEndpoint, 'desktop')
        .getUserPhoneNumbers,
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
