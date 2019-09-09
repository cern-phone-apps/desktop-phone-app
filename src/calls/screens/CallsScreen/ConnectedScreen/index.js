import { connect } from "react-redux";
import ConnectedScreen from "./ConnectedScreen";

function mapStateToProps({ call, connection, search, recent }) {
  return {
    connected: connection.connected,
    onCall: call.onCall,
    calling: call.calling,
    userSelected: search.userSelected,
    lastCall: recent.recentCalls
  };
}

export default connect(mapStateToProps)(ConnectedScreen);
