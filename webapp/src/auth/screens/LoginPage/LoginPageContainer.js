import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginPage from 'auth/screens/LoginPage/LoginPage';
import { bindActionCreators } from 'redux';

import dialBackendApi from 'services/api';
import { authActions } from 'dial-core';

function mapStateToProps({ auth }) {
  return {
    errors: auth.errors,
    isAuthenticated: auth.loggedIn,
    loginInProgress: auth.loginInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMe: dialBackendApi().getMe,
      login: dialBackendApi().login,
      setAuthenticated: authActions.setAuthenticated
    },
    dispatch
  );
}

export const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default withRouter(LoginPageContainer);
