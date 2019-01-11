import { connect } from "react-redux";

import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import ConnectionStatusModal from "./ConnectionStatusModal";

function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    activeNumber: calls.numbers.activeNumber
  };
}

export const ConnectionStatusModalContainer = connect(
  mapStateToProps,
  null
)(ConnectionStatusModal);

export default phoneService(ConnectionStatusModalContainer);
