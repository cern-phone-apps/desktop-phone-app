import PropTypes from "prop-types";
import { Grid, Icon, Segment } from "semantic-ui-react";
import React, { Component } from "react";
import Dialpad from "../Dialpad/Dialpad";
import { buildRecipient } from "calls/utils";
import { logMessage } from "common/utils";

/**
 * Represents the Call Button on the DialPad
 * @param props
 * @returns {*}
 * @constructor
 */
export function CallButton({ clickHandler, text }) {
  return (
    <div className={"DialButton CallButton"} onClick={() => clickHandler()}>
      <div className={"DialButton__content"}>{text}</div>
    </div>
  );
}

CallButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired
};

export class CallerDialpad extends Component {
  static propTypes = {
    phoneService: PropTypes.object.isRequired,
    unSelectUser: PropTypes.func.isRequired,
    dialpadValue: PropTypes.string.isRequired,
    updateDialpadValue: PropTypes.func.isRequired
  };

  makeCall = () => {
    const recipient = {
      name: "Unknown",
      phoneNumber: this.props.dialpadValue
    };

    this.props.unSelectUser();
    this.props.phoneService.makeCall(buildRecipient(recipient));
  };

  handleDialPadButtonClick = value => {
    logMessage("handleDialPadButtonClick: ", value);
    logMessage("handleDialPadButtonClick: ", this.props.dialpadValue);
    this.props.updateDialpadValue(this.props.dialpadValue + value);
  };
  render = () => {
    return (
      <Segment attached="bottom" className={"Dialpad"}>
        <Dialpad handleButtonClick={this.handleDialPadButtonClick}>
          <Grid.Row>
            <Grid.Column />
            <Grid.Column textAlign={"center"}>
              <CallButton
                clickHandler={this.makeCall}
                text={<Icon name={"phone"} />}
              />
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Dialpad>
      </Segment>
    );
  };
}
