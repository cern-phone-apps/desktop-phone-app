import { API_ENDPOINT } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { numberActions } from 'dial-core';
import RegisterScreen from './RegisterScreen';

function mapStateToProps(state) {
  const { connection, numbers } = state.calls;
  const { auth } = state;

  return {
    connected: connection ? connection.connected : false,
    numbers: numbers.numbers,
    token: auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserPhoneNumbers: numberActions.getUserPhoneNumbers(API_ENDPOINT),
      setActiveNumber: numberActions.setActiveNumber
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
