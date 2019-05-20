import { API_ENDPOINT } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActionFactory } from 'dial-core';

import LoginWebView from './LoginWebView';

function mapStateToProps(state) {
  const { auth } = state;
  return {
    ...auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login: authActionFactory(API_ENDPOINT).login
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWebView);
