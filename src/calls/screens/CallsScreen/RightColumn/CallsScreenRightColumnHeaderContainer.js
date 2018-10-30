import { connect } from "react-redux";
import { CallsScreenRightColumnHeader } from "calls/screens/CallsScreen/RightColumn/CallsScreenRightColumnHeader";

function mapStateToProps({ calls }) {
  return {
    onCall: calls.call.onCall,
    connected: calls.connection.connected,
    calling: calls.call.calling
  };
}

export default connect(mapStateToProps)(CallsScreenRightColumnHeader);
