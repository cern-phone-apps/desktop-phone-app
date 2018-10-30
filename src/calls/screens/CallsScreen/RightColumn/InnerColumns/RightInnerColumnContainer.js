import { connect } from "react-redux";
import { RightInnerColumn } from "calls/screens/CallsScreen/RightColumn/InnerColumns/RightInnerColumn";

function mapStateToProps({ calls }) {
  return {
    onCall: calls.call.onCall,
    connected: calls.connection.connected,
    calling: calls.call.calling,
    userSelected: calls.search.userSelected
  };
}

export default connect(mapStateToProps)(RightInnerColumn);
