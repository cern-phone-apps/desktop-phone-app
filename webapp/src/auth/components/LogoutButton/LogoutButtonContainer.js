import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import TranslatedLogoutButton from 'auth/components/LogoutButton/LogoutButton';
import { authActionFactory } from 'dial-core';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: authActionFactory(process.env.REACT_APP_API_ENDPOINT).logout
    },
    dispatch
  );
}

export const LogoutButtonContainer = connect(
  null,
  mapDispatchToProps
)(TranslatedLogoutButton);

export default withRouter(LogoutButtonContainer);
