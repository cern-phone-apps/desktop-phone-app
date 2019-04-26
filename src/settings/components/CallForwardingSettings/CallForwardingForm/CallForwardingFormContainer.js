import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addLocalForwardNumber,
  getCallForwardingStatus
} from "settings/actions/call_forwarding";
import { CallForwardingForm } from "./CallForwardingForm";

function mapStateToProps({ settings }) {
  return {
    localForwardList: settings.callForwarding.localForwardList,
    fetchingStatus: settings.callForwarding.fetchingStatus,
    status: settings.callForwarding.status,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addLocalForwardNumber,
      getCallForwardingStatus
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallForwardingForm);
