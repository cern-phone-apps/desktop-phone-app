import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { makeCall } from "calls/actions/call";
import { CallerDialpadForm } from "./CallerDialpadForm";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import { updateDialpadValue } from "calls/actions/dialpad";

function mapStateToProps({ calls }) {
  return {
    value: calls.dialpad.value
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

export const CallerDialpad =  connect(
  mapStateToProps,
  mapDispatchToProps
)(CallerDialpadForm);

export default phoneService(CallerDialpad)