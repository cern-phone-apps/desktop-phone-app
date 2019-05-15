import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isAuthenticated } from 'auth/utils/tokens';
import { bindActionCreators } from 'redux';

import RedirectPage from 'auth/screens/RedirectPage/RedirectPage';
import { authActionFactory, meActionFactory } from 'dial-core';

function mapStateToProps({ errors, auth, router }) {
  return {
    errors,
    isAuthenticated: isAuthenticated(auth),
    urlQuery: router.location.search,
    loginInProgress: auth.loginInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMe: meActionFactory(process.env.REACT_APP_API_ENDPOINT).getMe,
      login: authActionFactory(process.env.REACT_APP_API_ENDPOINT).login
    },
    dispatch
  );
}

export const RedirectPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectPage);

export default withRouter(RedirectPageContainer);
