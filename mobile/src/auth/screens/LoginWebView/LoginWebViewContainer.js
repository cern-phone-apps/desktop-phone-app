import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authActions } from 'dial-core';

import LoginWebView from './LoginWebView';
import dialBackendApi from '../../../services/api';

function mapStateToProps({ auth }) {
  const { login, loginInProgress, loggedIn, error } = auth;
  return {
    login,
    loginInProgress,
    loggedIn,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMe: dialBackendApi().getMe,
      login: dialBackendApi().login,
      setAuthenticated: authActions.setAuthenticatedMobile
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWebView);
