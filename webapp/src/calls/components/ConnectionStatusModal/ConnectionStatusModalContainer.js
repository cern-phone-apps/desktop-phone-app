import { connect } from "react-redux";

import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import ConnectionStatusModal from "./ConnectionStatusModal";
import { setUserDoNotDisturb } from "calls/actions/status";
import { getMe } from "auth/actions/me";
import { bindActionCreators } from "redux";

function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    activeNumber: calls.numbers.activeNumber,
    doNotDisturb: calls.status.doNotDisturb,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserDoNotDisturb,
    getMe
  }, dispatch);
}

export const ConnectionStatusModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionStatusModal);

export default phoneService(ConnectionStatusModalContainer);
