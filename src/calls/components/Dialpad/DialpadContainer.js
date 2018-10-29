import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { makeCall } from "calls/actions/call";
import { updateDialpadValue } from "calls/actions/dialpad";
import Dialpad from "calls/components/Dialpad/Dialpad";

function mapStateToProps({ calls }) {
  return {
    dialpadValue: calls.dialpad.value
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      makeCall,
      updateDialpadValue
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialpad);
