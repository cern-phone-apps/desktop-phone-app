import { connect } from "react-redux";
import { isAuthenticated } from "login/utils";
import { withRouter } from "react-router-dom";
import LoginPage from "login/screens/LoginPage/LoginPage";

function mapStateToProps({ auth }) {
  return {
    errors: auth.errors,
    isAuthenticated: isAuthenticated(auth),
    loginInProgress: auth.loginInProgress
  };
}

export const LoginPageContainer = connect(mapStateToProps)(LoginPage);

export default withRouter(LoginPageContainer);
