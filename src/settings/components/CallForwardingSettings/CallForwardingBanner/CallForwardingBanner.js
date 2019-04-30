import React, { Component } from "react";

import styles from "./CallForwardingBanner.module.css";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Icon } from "semantic-ui-react";

export class CallForwardingBanner extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    status: PropTypes.object,
    getCallForwardingStatus: PropTypes.func.isRequired
  };

  state = {
    callForwardingEnabled: false,
    fetchTimes: 0
  };

  componentDidMount() {
    this.fetchCallForwardingStatus();
  }

  async fetchCallForwardingStatus() {
    const forwardingData = await this.props.getCallForwardingStatus();
    if (forwardingData && forwardingData.payload.result.success) {
      // Obtain values from the payload
      const { payload } = forwardingData;
      const callForwardingStatus = payload.result["call-forwarding"];
      const simultaneousRingingStatus = payload.result["simultaneous-ring"];
      // Build dropdown options
      // Get radio button value
      let status = this.isCallForwardingEnabled(
        callForwardingStatus,
        simultaneousRingingStatus
      );
      this.setState({ callForwardingEnabled: status });
    } else {
      if (this.state.fetchTimes < 2) {
        this.setState({ fetchTimes: this.state.fetchTimes + 1 });
        this.fetchCallForwardingStatus();
      }
    }
  }

  openSettingsModalAction = () => {
    const { openSettingsModal } = this.props;
    openSettingsModal();
  };

  isCallForwardingEnabled = (
    callForwardingStatus,
    simultaneousRingingStatus
  ) => {
    let result = false;
    if (callForwardingStatus || simultaneousRingingStatus) {
      result = true;
    }
    return result;
  };

  render() {
    if (this.state.callForwardingEnabled) {
      return (
        <div
          onClick={this.openSettingsModalAction}
          className={`padded-item ${styles.callForwardingMessage}`}
        >
          <Icon name={"warning sign"} /> {"Call Forwarding is enabled"}
        </div>
      );
    }

    return <></>;
  }
}

export default translate("settings")(CallForwardingBanner);
