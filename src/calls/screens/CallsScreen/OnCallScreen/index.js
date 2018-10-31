import { connect } from "react-redux";
import { OncallScreen } from "./OnCallScreen";

function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    onCall: calls.call.onCall,
    calling: calls.call.calling,
    userSelected: calls.search.userSelected
  };
}

export default connect(mapStateToProps)(OncallScreen);