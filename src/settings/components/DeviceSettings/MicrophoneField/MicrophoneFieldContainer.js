import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MicrophoneField from "settings/components/DeviceSettings/MicrophoneField/MicrophoneField";
import {setMicrophone} from "settings/actions/devices";

function mapStateToProps({ devices }) {
  return {
    inputDevice: devices.microphone
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setMicrophone
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MicrophoneField);
