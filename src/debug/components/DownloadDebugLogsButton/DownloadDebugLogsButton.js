import React, { Component } from "react";
import { Button, Form, Header, Icon, Modal, TextArea } from "semantic-ui-react";
import DetectRTC from "detectrtc";
import { actionMessage, errorMessage, logMessage } from "common/utils";
import { stopStreams } from "settings/utils/devices";

export class DownloadDebugLogsButton extends Component {
  state = {
    modalOpen: false,
    logsLoaded: false
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    this.setState({ modalOpen: false });
    stopStreams();
  };

  loadLogs = () => {
    actionMessage(`Calls: User Clicks on loadLogs button`);
    DetectRTC.load(() => {
      let ipDict = {};

      DetectRTC.DetectLocalIPAddress((ipAddress, isPublic, isIpv4) => {
        ipDict = this.getIpAddress(ipAddress, isPublic, isIpv4);
      });

      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(stream => {
          this.generateLogs(ipDict);
        })
        .catch(() => {
          errorMessage("User did not give microphone permission.");
          this.generateLogs(ipDict);
        });
    });
    this.setState({ logsLoaded: true });
  };

  getIpAddress = (ip, publicAddress, ipv4) => {
    return {
      ip: {
        address: ip,
        public: publicAddress,
        ipv4: ipv4
      }
    };
  };

  generateLogs(ipDict = {}) {
    logMessage("Loading system info...");
    let logs = JSON.parse(localStorage.getItem("logs"));
    logs.push(this.getSystemInformation(ipDict));
    this.setState({ logs: JSON.stringify(logs) });
  }

  getOSInformation = () => {
    const name = DetectRTC.osName;
    const version = DetectRTC.osVersion;
    const displayResolution = DetectRTC.displayResolution;
    const displayAspectRatio = DetectRTC.displayAspectRatio;
    const isMobileDevice = DetectRTC.isMobileDevice;

    return {
      os: {
        name: name,
        version: version,
        resolution: displayResolution,
        aspectRatio: displayAspectRatio,
        isMobileDevice: isMobileDevice
      }
    };
  };

  getBrowserInformation = () => {
    const browser = DetectRTC.browser.name;
    const browserVersion = DetectRTC.browser.fullVersion;
    const isPromisesSupported = DetectRTC.isPromisesSupported;

    return {
      browser: {
        name: browser,
        version: browserVersion,
        isPromisesSupported: isPromisesSupported
      }
    };
  };

  getWebrtcInformation = () => {
    const webrtcEnabled = DetectRTC.isWebRTCSupported;
    const ortcSupported = DetectRTC.isORTCSupported;
    const webSocketsSupported = DetectRTC.isWebSocketsSupported;
    const isAudioContextSupported = DetectRTC.isAudioContextSupported;
    const isSctpDataChannelsSupported = DetectRTC.isSctpDataChannelsSupported;
    const isRtpDataChannelsSupported = DetectRTC.isRtpDataChannelsSupported;

    return {
      webrtc: {
        enabled: webrtcEnabled,
        ortc: ortcSupported,
        webSocketsSupported: webSocketsSupported,
        isAudioContextSupported: isAudioContextSupported,
        isSctpDataChannelsSupported: isSctpDataChannelsSupported,
        isRtpDataChannelsSupported: isRtpDataChannelsSupported
      }
    };
  };

  getDevicesInformation = () => {
    const getUserMediaAvailable = DetectRTC.isGetUserMediaSupported;
    const hasMicrophonePermissions =
      DetectRTC.isWebsiteHasMicrophonePermissions;
    const canChangeOutputDevice = DetectRTC.isSetSinkIdSupported;
    const hasSpeakers = DetectRTC.hasSpeakers;
    const hasMicrophone = DetectRTC.hasMicrophone;

    let inputLabels = [];
    DetectRTC.audioInputDevices.forEach(function(device) {
      inputLabels.push(device.label);
    });

    let outputLabels = [];
    DetectRTC.audioInputDevices.forEach(function(device) {
      outputLabels.push(device.label);
    });

    return {
      devices: {
        getUserMediaAvailable: getUserMediaAvailable,
        hasMicrophonePermissions: hasMicrophonePermissions,
        canChangeOutputDevice: canChangeOutputDevice,
        speakers: {
          available: hasSpeakers,
          count: DetectRTC.audioOutputDevices.length,
          labels: outputLabels
        },
        microphones: {
          available: hasMicrophone,
          count: DetectRTC.audioInputDevices.length,
          labels: inputLabels
        }
      }
    };
  };

  getSystemInformation = ipAddress => {
    return {
      system: {
        ...this.getOSInformation(),
        ...this.getBrowserInformation(),
        ...this.getWebrtcInformation(),
        ...this.getDevicesInformation(),
        ...ipAddress
      }
    };
  };

  render() {
    const { logsLoaded } = this.state;
    return (
      <Modal
        trigger={
          <Button onClick={this.handleOpen} className={"flat"} icon={"bug"} />
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <Header icon="browser" content="Logs" />
        <Modal.Content>
          <Form>
            <TextArea
              placeholder="Log content"
              style={{ minHeight: 100 }}
              value={this.state.logs}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color={"green"} onClick={this.loadLogs}>
            Load Logs
          </Button>

          <Button
            color="blue"
            disabled={!logsLoaded}
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              this.state.logs
            )}`}
            download="data.json"
          >
            <Icon name="checkmark" /> Download Logs
          </Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DownloadDebugLogsButton;
