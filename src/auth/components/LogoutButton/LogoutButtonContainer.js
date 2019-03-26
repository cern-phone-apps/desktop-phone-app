import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import LogoutButton from "auth/components/LogoutButton/LogoutButton";
import { logout } from "auth/actions/auth";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout
    },
    dispatch
  );
}

export const LogoutButtonContainer = connect(
  null,
  mapDispatchToProps
)(LogoutButton);

export default withRouter(LogoutButtonContainer);
