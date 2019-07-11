import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainPage from 'common/screens/MainPage/MainPage';
import { bindActionCreators } from 'redux';
import { hideSidebar, displaySidebar } from 'common/actions/sidebar';
import { openSettingsModal } from 'settings/actions/modal';

function mapStateToProps({ auth, common }) {
  return {
    errors: auth.errors,
    isAuthenticated: auth.loggedIn,
    loginInProgress: auth.loginInProgress,
    isVisible: common.sidebar.isVisible,
    contentDimmed: common.sidebar.contentDimmed,
    notifications: common.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      displaySidebar,
      hideSidebar,
      openSettingsModal
    },
    dispatch
  );
}

export const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

export default withRouter(MainPageContainer);
