import React, {Component} from 'react'
import DetectRTC from 'detectrtc'
import {getUserDevices, stopStreams} from 'settings/utils/devices'


export class DeviceField extends Component {

  state = {
    devices: [],
    isWebRTCSupported: false
  }

  componentDidMount () {
    DetectRTC.load(() => {
      this.setState({
        isWebRTCSupported: DetectRTC.isWebRTCSupported
      })
      if (DetectRTC.isWebRTCSupported) {
        getUserDevices().then(
          (devices) => this.setState({
            devices: devices
          }))
      }
    })
  }

  componentWillUnmount () {
    stopStreams()
  }

  render () {
    return ''
  }
}

export default DeviceField
