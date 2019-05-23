import { API_ENDPOINT } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authActionFactory } from 'dial-core';
import LoginScreen from './LoginScreen';

function mapStateToProps(state) {
  const { auth } = state;
  return {
    ...auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...authActionFactory(API_ENDPOINT, 'mobile')
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
