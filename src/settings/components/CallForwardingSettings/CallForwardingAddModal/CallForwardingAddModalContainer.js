import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addLocalForwardNumber,
} from "settings/actions/call_forwarding";
import { CallForwardingAddModal } from "./CallForwardingAddModal";

function mapStateToProps({ settings }) {
  return {
    localForwardList: settings.callForwarding.localForwardList,
    status: settings.callForwarding.status,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addLocalForwardNumber
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallForwardingAddModal);
