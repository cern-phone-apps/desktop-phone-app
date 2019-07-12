import React, { Component } from 'react';
import { Button, Form, Header, Icon, Modal, TextArea } from 'semantic-ui-react';
import DetectRTC from 'detectrtc';
import { actionMessage, errorMessage, logMessage } from 'common/utils/logs';
import { stopStreams } from 'settings/utils/devices';
import PropTypes from 'prop-types';

function DownloadDebugModalActions({
  loadLogsClick,
  logsLoaded,
  handleCloseClick,
  uriComponent
}) {
  return (
    <Modal.Actions>
      <Button color="green" onClick={loadLogsClick}>
        Load Logs
      </Button>

      <Button
        color="blue"
        disabled={!logsLoaded}
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          uriComponent
        )}`}
        download="data.json"
      >
        <Icon name="checkmark" /> Download Logs
      </Button>
      <Button onClick={handleCloseClick}>Close</Button>
    </Modal.Actions>
  );
}

DownloadDebugModalActions.propTypes = {
  loadLogsClick: PropTypes.func.isRequired,
  logsLoaded: PropTypes.bool.isRequired,
  uriComponent: PropTypes.string,
  handleCloseClick: PropTypes.func.isRequired
};

DownloadDebugModalActions.defaultProps = {
  uriComponent: ''
};

function DownloadDebugModalLogsContent({ value }) {
  return (
    <Modal.Content>
      <Form>
        <TextArea
          placeholder="Log content"
          style={{ minHeight: 100 }}
          value={value}
        />
      </Form>
    </Modal.Content>
  );
}

DownloadDebugModalLogsContent.propTypes = { value: PropTypes.string };

DownloadDebugModalLogsContent.defaultProps = {
  value: ''
};

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
        .then(() => {
          this.generateLogs(ipDict);
        })
        .catch(() => {
          errorMessage('User did not give microphone permission.');
          this.generateLogs(ipDict);
        });
    });
    this.setState({ logsLoaded: true });
  };

  getIpAddress = (ip, publicAddress, ipv4) => ({
    ip: {
      address: ip,
      public: publicAddress,
      ipv4
    }
  });

  getOSInformation = () => {
    const name = DetectRTC.osName;
    const version = DetectRTC.osVersion;
    const { displayResolution } = DetectRTC;
    const { displayAspectRatio } = DetectRTC;
    const { isMobileDevice } = DetectRTC;

    return {
      os: {
        name,
        version,
        resolution: displayResolution,
        aspectRatio: displayAspectRatio,
        isMobileDevice
      }
    };
  };

  getBrowserInformation = () => {
    const browser = DetectRTC.browser.name;
    const browserVersion = DetectRTC.browser.fullVersion;
    const { isPromisesSupported } = DetectRTC;

    return {
      browser: {
        name: browser,
        version: browserVersion,
        isPromisesSupported
      }
    };
  };

  getWebrtcInformation = () => {
    const webrtcEnabled = DetectRTC.isWebRTCSupported;
    const ortcSupported = DetectRTC.isORTCSupported;
    const webSocketsSupported = DetectRTC.isWebSocketsSupported;
    const { isAudioContextSupported } = DetectRTC;
    const { isSctpDataChannelsSupported } = DetectRTC;
    const { isRtpDataChannelsSupported } = DetectRTC;

    return {
      webrtc: {
        enabled: webrtcEnabled,
        ortc: ortcSupported,
        webSocketsSupported,
        isAudioContextSupported,
        isSctpDataChannelsSupported,
        isRtpDataChannelsSupported
      }
    };
  };

  getDevicesInformation = () => {
    const getUserMediaAvailable = DetectRTC.isGetUserMediaSupported;
    const hasMicrophonePermissions =
      DetectRTC.isWebsiteHasMicrophonePermissions;
    const canChangeOutputDevice = DetectRTC.isSetSinkIdSupported;
    const { hasSpeakers } = DetectRTC;
    const { hasMicrophone } = DetectRTC;

    const inputLabels = [];
    DetectRTC.audioInputDevices.forEach(device => {
      inputLabels.push(device.label);
    });

    const outputLabels = [];
    DetectRTC.audioInputDevices.forEach(device => {
      outputLabels.push(device.label);
    });

    return {
      devices: {
        getUserMediaAvailable,
        hasMicrophonePermissions,
        canChangeOutputDevice,
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

  getSystemInformation = ipAddress => ({
    system: {
      ...this.getOSInformation(),
      ...this.getBrowserInformation(),
      ...this.getWebrtcInformation(),
      ...this.getDevicesInformation(),
      ...ipAddress
    }
  });

  generateLogs(ipDict = {}) {
    logMessage('Loading system info...');
    const logs = JSON.parse(localStorage.getItem('logs'));
    logs.push(this.getSystemInformation(ipDict));
    this.setState({ logs: JSON.stringify(logs) });
  }

  render() {
    const { logsLoaded, logs, modalOpen } = this.state;
    return (
      <Modal
        trigger={
          <Button onClick={this.handleOpen} className="flat" icon="bug" />
        }
        open={modalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <Header icon="browser" content="Logs" />
        <DownloadDebugModalLogsContent value={logs} />
        <DownloadDebugModalActions
          loadLogsClick={this.loadLogs}
          logsLoaded={logsLoaded}
          uriComponent={logs}
          handleCloseClick={this.handleClose}
        />
      </Modal>
    );
  }
}

export default DownloadDebugLogsButton;
