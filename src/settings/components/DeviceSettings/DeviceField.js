import React from 'react';
import DetectRTC from 'detectrtc';
import { getUserDevices, stopStreams } from 'settings/utils/devices';
import { Form, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const devicePropTypes = {
  fieldLabel: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  fieldType: PropTypes.oneOf(['audioinput', 'audiooutput'])
};

export class DeviceField extends React.Component {
  static propTypes = {
    ...devicePropTypes
  };

  state = {
    devices: [],
    isWebRTCSupported: false
  };

  componentDidMount() {
    DetectRTC.load(() => {
      this.setState({
        isWebRTCSupported: DetectRTC.isWebRTCSupported
      });
      if (DetectRTC.isWebRTCSupported) {
        getUserDevices().then(devices =>
          this.setState({
            devices
          })
        );
      }
    });
  }

  componentWillUnmount() {
    stopStreams();
  }

  deviceExists(device, deviceList) {
    if (!device) return false;
    for (let a = 0; deviceList[a]; a++) {
      if (deviceList[a].value === device) return true;
    }
    return false;
  }

  render() {
    const { fieldLabel, fieldId, fieldType } = this.props;
    const { hasDevice, devices, device } = this.state;

    if (hasDevice && devices.length > 0) {
      return (
        <Form.Field>
          <label htmlFor={fieldId}>{fieldLabel}</label>
          {devices && (
            <Dropdown
              id={fieldId}
              selection
              defaultValue={
                this.deviceExists(device, devices) ? device : 'default'
              }
              options={devices.filter(device => device.kind === fieldType)}
              onChange={(event, data) => this.selectDevice(data.value)}
            />
          )}
        </Form.Field>
      );
    }
    return <Form.Field>No input devices found</Form.Field>;
  }
}

export default DeviceField;
