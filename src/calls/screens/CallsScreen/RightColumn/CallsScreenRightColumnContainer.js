import { connect } from "react-redux";
import { CallsScreenRightColumn } from "calls/screens/CallsScreen/RightColumn/CallsScreenRightColumn";

function mapStateToProps({ calls }) {
  return {
    onCall: calls.call.onCall
  };
}

export default connect(mapStateToProps)(CallsScreenRightColumn);
