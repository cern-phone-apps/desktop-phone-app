import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import TranslatedLogoutButton from 'auth/components/LogoutButton/LogoutButton';

import dialBackendApi from 'services/api';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: dialBackendApi.logout
    },
    dispatch
  );
}

export const LogoutButtonContainer = connect(
  null,
  mapDispatchToProps
)(TranslatedLogoutButton);

export default withRouter(LogoutButtonContainer);
