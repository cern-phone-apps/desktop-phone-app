import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { numbersActions } from 'dial-core';
import RegisterScreen from './RegisterScreen';

import dialBackendApi from '../../../services/api';

function mapStateToProps({ connection, numbers, auth }) {
  return {
    connected: connection ? connection.connected : false,
    numbers: numbers.numbers,
    token: auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserPhoneNumbers: dialBackendApi().getUserPhoneNumbers,
      setActiveNumber: numbersActions.setActiveNumber
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
