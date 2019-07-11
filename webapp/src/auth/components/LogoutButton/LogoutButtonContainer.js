import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import TranslatedLogoutButton from 'auth/components/LogoutButton/LogoutButton';
import { authActionFactory } from 'dial-core';

import config from 'config';

const apiEndpoint = config.api.ENDPOINT;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: authActionFactory(apiEndpoint, 'desktop').logout
    },
    dispatch
  );
}

export const LogoutButtonContainer = connect(
  null,
  mapDispatchToProps
)(TranslatedLogoutButton);

export default withRouter(LogoutButtonContainer);
