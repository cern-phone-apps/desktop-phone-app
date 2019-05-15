import PropTypes from "prop-types";
import { changeInputDevice } from "settings/utils/devices";
import DeviceField, {
  devicePropTypes
} from "settings/components/DeviceSettings/DeviceField";
import DetectRTC from "detectrtc";
import { logMessage } from "common/utils/logs";

/**
 *
 */
export class MicrophoneField extends DeviceField {
  static propTypes = {
    ...devicePropTypes,
    inputDevice: PropTypes.string,
    setMicrophone: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    super.componentDidMount();

    this.state.hasDevice = false;
    if (this.props && this.props.inputDevice) {
      this.state.device = this.props.inputDevice;
    }

    DetectRTC.load(() => {
      this.setState({
        hasDevice: DetectRTC.hasMicrophone
      });
    });
    changeInputDevice(this.state.device);
  };

  selectDevice = value => {
    this.props.setMicrophone(value);
    // this.stopStreams()
    logMessage("Selecting device");
    changeInputDevice(value);
  };
}

export default MicrophoneField;
