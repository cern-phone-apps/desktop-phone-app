import React, { Component } from "react";
import PropTypes from "prop-types";
import "./OnCallDetails.css";
import { Icon, Segment } from "semantic-ui-react";
import { translate } from "react-i18next";
import Timer from "calls/components/Timer/Timer";

export class OnCallDetails extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    phoneService: PropTypes.object.isRequired,
    recipient: PropTypes.object.isRequired
  };

  hangup = () => {
    const { phoneService } = this.props;
    phoneService.hangUpCurrentCall();
  };

  render() {
    const { t, recipient } = this.props;
    return (
      <Segment basic>
        <Segment textAlign={"center"}>
          <div>
            <h3 className="ui center aligned header">{t("onCallWithText")}</h3>
            <h2 className="ui center aligned header">
              <Icon name={"user"} /> {recipient.name}
            </h2>
            <div className="ui center aligned basic segment">
              <Timer startTime={recipient.startTime} />
            </div>
            <div className="ui center aligned basic segment">
              <button
                onClick={() => this.hangup()}
                className={
                  "ui circular red icon button OnCallDetails__HangupButton"
                }
              >
                <i className="phone icon" />
              </button>
              <button className="ui circular icon button">
                <i className="mute icon" />
              </button>
            </div>
          </div>
        </Segment>
      </Segment>
    );
  }
}

export default translate("calls")(OnCallDetails);
