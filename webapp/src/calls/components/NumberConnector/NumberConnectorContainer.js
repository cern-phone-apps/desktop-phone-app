import { connect } from 'react-redux';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import { bindActionCreators } from 'redux';

import { numbersActionFactory, numbersActions } from 'dial-core';

import config from 'config';
import NumberConnector from './NumberConnector';

const apiEndpoint = config.api.ENDPOINT;

function mapStateToProps({ calls }) {
  return {
    connecting: calls.connection.connecting,
    numbers: calls.numbers.numbers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserPhoneNumbers: numbersActionFactory(apiEndpoint, "desktop")
        .getUserPhoneNumbers,
      setActiveNumber: numbersActions.setActiveNumber
    },
    dispatch
  );
}

export const NumberConnectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberConnector);

export default withPhoneService(NumberConnectorContainer);
