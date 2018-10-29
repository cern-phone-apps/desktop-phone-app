import { connect } from "react-redux";

import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import DisconnectNumberButton from "calls/components/DisconnectNumberButton/DisconnectNumberButton";

function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    disconnecting: calls.connection.disconnecting
  };
}

export const DisconnectNumberButtonContainer = connect(
  mapStateToProps,
  null
)(DisconnectNumberButton);

export default phoneService(DisconnectNumberButtonContainer);
