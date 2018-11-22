import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { makeCall } from "calls/actions/call";
import {updateDialpadValue} from "calls/actions/dialpad";
import { CallerDialpad } from "./CallerDialpad";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import { unSelectUser } from "calls/actions/search";

function mapStateToProps({ calls }) {
  return {
    dialpadValue: calls.dialpad.value
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      makeCall,
      updateDialpadValue,
      unSelectUser
    },
    dispatch
  );
}

export const ConnectedDialpad =  connect(
  mapStateToProps,
  mapDispatchToProps
)(CallerDialpad);

export default phoneService(ConnectedDialpad)