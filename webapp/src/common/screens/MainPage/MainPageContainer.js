import { connect } from "react-redux";
import { isAuthenticated } from "auth/utils/tokens";
import { withRouter } from "react-router-dom";

import MainPage from "common/screens/MainPage/MainPage";
import { bindActionCreators } from "redux";
import { hideSidebar } from "common/actions/sidebar";
import {openSettingsModal} from "settings/actions/modal";

function mapStateToProps({ auth, common }) {
  return {
    errors: auth.errors,
    isAuthenticated: isAuthenticated(auth),
    loginInProgress: auth.loginInProgress,
    isVisible: common.sidebar.isVisible,
    contentDimmed: common.sidebar.contentDimmed,
    notifications: common.notifications,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    hideSidebar,
    openSettingsModal
  }, dispatch);
}

export const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

export default withRouter(MainPageContainer);
