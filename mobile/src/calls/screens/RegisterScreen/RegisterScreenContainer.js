import { API_ENDPOINT } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { numbersActionFactory, authActions } from 'dial-core';
import RegisterScreen from './RegisterScreen';

function mapStateToProps(state) {
  const { connection, numbers } = state.calls;

  return {
    connected: connection ? connection.connected : false,
    numbers: numbers.numbers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserPhoneNumbers: numbersActionFactory(API_ENDPOINT, 'mobile')
        .getUserPhoneNumbers,
      setActiveNumber: authActions.setActiveNumber
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
