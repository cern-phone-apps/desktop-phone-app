import { connect } from "react-redux";

import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import {logout} from "auth/actions/auth";
import DisconnectAndLogoutButton from "./DisconnectAndLogoutButton";
import { bindActionCreators } from "redux";

function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    disconnecting: calls.connection.disconnecting
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout
    },
    dispatch
  );
}

export const DisconnectNumberButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectAndLogoutButton);

export default phoneService(DisconnectNumberButtonContainer);
