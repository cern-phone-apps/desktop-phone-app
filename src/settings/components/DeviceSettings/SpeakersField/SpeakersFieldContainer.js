import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SpeakersField from "settings/components/DeviceSettings/SpeakersField/SpeakersField";
import {setSpeaker} from "settings/actions/devices";

function mapStateToProps({ devices }) {
  return {
    outputDevice: devices.speaker
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSpeaker
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeakersField);
