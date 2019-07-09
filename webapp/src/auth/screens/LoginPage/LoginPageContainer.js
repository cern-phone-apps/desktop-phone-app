import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginPage from 'auth/screens/LoginPage/LoginPage';
import { authActionFactory, meActionFactory } from 'dial-core';
import { bindActionCreators } from 'redux';

import config from 'config';

const apiEndpoint = config.api.ENDPOINT;

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
      getMe: meActionFactory(apiEndpoint).getMe,
      login: authActionFactory(apiEndpoint).login
    },
    dispatch
  );
}

export const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default withRouter(LoginPageContainer);
