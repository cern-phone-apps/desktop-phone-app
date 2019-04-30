import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addLocalForwardNumber } from "settings/actions/call_forwarding";
import { CallForwardingAddModal } from "./CallForwardingAddModal";
import { searchUsers } from "calls/actions/search";

function mapStateToProps({ settings, user }) {
  return {
    localForwardList: settings.callForwarding.localForwardList,
    status: settings.callForwarding.status,
    me: user.me
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addLocalForwardNumber,
      searchUsers
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallForwardingAddModal);
