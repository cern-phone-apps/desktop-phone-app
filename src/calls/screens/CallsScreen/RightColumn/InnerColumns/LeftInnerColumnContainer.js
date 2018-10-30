import { connect } from "react-redux";
import LeftInnerColumn from "calls/screens/CallsScreen/RightColumn/InnerColumns/LeftInnerColumn";

function mapStateToProps({ calls }) {
  return {
    onCall: calls.call.onCall,
    connected: calls.connection.connected,
    calling: calls.call.calling
  };
}

export default connect(mapStateToProps)(LeftInnerColumn);
