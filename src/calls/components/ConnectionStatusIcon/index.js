import { connect } from "react-redux";

import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import ConnectionStatusIcon from "./ConnectionStatusIcon";

function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    activeNumber: calls.numbers.activeNumber
  };
}

export const ConnectionStatusIconContainer = connect(
  mapStateToProps,
  null
)(ConnectionStatusIcon);

export default phoneService(ConnectionStatusIconContainer);
