import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { openSettingsModal } from "settings/actions/modal";
import CallsSidebar from "./CallsSidebar";


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openSettingsModal
  }, dispatch);
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(CallsSidebar)
);