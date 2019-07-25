import { connect } from "react-redux";
import ConnectedScreen from "./ConnectedScreen";

function mapStateToProps({ call, connection, search }) {
  return {
    connected: connection.connected,
    onCall: call.onCall,
    calling: call.calling,
    userSelected: search.userSelected
  };
}

export default connect(mapStateToProps)(ConnectedScreen);
