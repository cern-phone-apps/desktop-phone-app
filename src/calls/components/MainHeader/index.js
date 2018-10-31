import { connect } from "react-redux";
import { MainHeader } from "./MainHeader";

function mapStateToProps({ calls }) {
  return {
    onCall: calls.call.onCall,
    connected: calls.connection.connected,
    calling: calls.call.calling
  };
}

export default connect(mapStateToProps)(MainHeader);
