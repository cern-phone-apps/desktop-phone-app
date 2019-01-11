import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "login/utils/tokens";
import { bindActionCreators } from "redux";

import RedirectPage from "login/screens/RedirectPage/RedirectPage";
import { getMe } from "login/actions/me";
import { login } from "login/actions/auth";

function mapStateToProps({ errors, auth, router }) {
  return {
    errors: errors,
    isAuthenticated: isAuthenticated(auth),
    urlQuery: router.location.search,
    loginInProgress: auth.loginInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMe,
      login
    },
    dispatch
  );
}

export const RedirectPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectPage);

export default withRouter(RedirectPageContainer);
