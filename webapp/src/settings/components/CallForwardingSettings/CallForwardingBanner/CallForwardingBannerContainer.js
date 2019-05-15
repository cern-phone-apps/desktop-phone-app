import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CallForwardingBanner from "./CallForwardingBanner";
import { openSettingsModal } from "settings/actions/modal";
import { bindActionCreators } from "redux";
import { getCallForwardingStatus } from "settings/actions/call_forwarding";

function mapStateToProps({ settings }) {
  return {
    status: settings.callForwarding.status
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openSettingsModal,
      getCallForwardingStatus
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CallForwardingBanner)
);
