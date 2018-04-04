import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Form, Header } from 'semantic-ui-react'
import { translate } from 'react-i18next'
import DetectRTC from 'detectrtc'
import { changeAudioDestination, changeInputDevice, getUserDevices, stopStreams } from 'utils/devices'

class DeviceSettings extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    setMicrophone: PropTypes.func.isRequired,
    setSpeaker: PropTypes.func.isRequired,
    inputDevice: PropTypes.string,
    outputDevice: PropTypes.string
  }

  state = {
    devices: [],
    hasMicrophone: false,
    hasSpeakers: false,
    isWebRTCSupported: false,
    isChrome: false
  }

  componentWillMount = () => {
    DetectRTC.load(() => {
      this.setState({
        hasMicrophone: DetectRTC.hasMicrophone,
        hasSpeakers: DetectRTC.hasSpeakers,
        isWebRTCSupported: DetectRTC.isWebRTCSupported,
        isChrome: DetectRTC.browser.isChrome
      })
      if (DetectRTC.isWebRTCSupported) {
        console.debug('Component will mount')
        getUserDevices().then(
          (devices) => this.setState({
            devices: devices
          }))
        changeInputDevice(this.props.inputDevice)
        changeAudioDestination(this.props.outputDevice)
      }
    })
  }

  componentWillUnmount () {
    stopStreams()
  }

  selectInputDevice = (value) => {
    console.debug('Selected input device: ', value)
    this.props.setMicrophone(value)
    // this.stopStreams()
    changeInputDevice(value)
  }

  selectOutputDevice = (value) => {
    console.debug('Selected output device: ', value)
    console.debug('changeAudioDestination:', value)
    let audioElement = document.querySelector('audio')
    this.props.setSpeaker(value)
    changeAudioDestination(audioElement, value)
  }

  render () {
    const {t} = this.props

    return (
      <div>
        <Header as={'h4'}>{t('devices.header')}</Header>
        <Form>

          {this.state.hasMicrophone && <Form.Field>
            <label htmlFor="audioSource">{t('devices.audioInputLabel')}</label>
            {this.state.devices && <Dropdown
              id={'audioSource'}
              selection
              defaultValue={this.props.inputDevice || 'default'}
              options={this.state.devices.filter((device) => (device.kind === 'audioinput'))}
              onChange={(event, data) => this.selectInputDevice(data.value)}
            />
            }
          </Form.Field>
          }

          {this.state.hasSpeakers && <Form.Field>
            <label htmlFor="audioOutput">{t('devices.audioOutputLabel')}</label>
            {this.state.devices && <Dropdown
              id={'audioOutput'}
              selection
              defaultValue={this.props.outputDevice || 'default'}
              options={this.state.devices.filter((device) => (device.kind === 'audiooutput'))}
              onChange={(event, data) => this.selectOutputDevice(data.value)}
            />
            }
          </Form.Field>
          }
          <Form.Field>
            {/*<audio id="gum-local" controls autoPlay/>*/}
          </Form.Field>
        </Form>


      </div>
    )
  }
}

export default translate('settings')(DeviceSettings)
