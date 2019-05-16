import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginPage from 'auth/screens/LoginPage/LoginPage';

function mapStateToProps({ auth }) {
  return {
    errors: auth.errors,
    isAuthenticated: auth.loggedIn,
    loginInProgress: auth.loginInProgress
  };
}

export const LoginPageContainer = connect(mapStateToProps)(LoginPage);

export default withRouter(LoginPageContainer);
