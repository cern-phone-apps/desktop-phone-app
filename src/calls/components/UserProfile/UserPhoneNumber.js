import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";
import { buildRecipient } from "calls/utils";

export class UserPhoneNumber extends Component {
  static propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    recipientName: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    phoneService: PropTypes.object.isRequired,
    unSelectUser: PropTypes.func.isRequired,
  };

  makeCall = () => {
    const recipient = {
      name: this.props.recipientName,
      phoneNumber: this.props.phoneNumber,
      incoming: false,
      missed: false
    };

    this.props.unSelectUser();
    this.props.phoneService.makeCall(buildRecipient(recipient));
  };

  render() {
    return (
      <Button fluid className={"CalleeProfileNumber"} onClick={this.makeCall}>
        <Icon name={this.props.icon} /> {this.props.phoneNumber}
      </Button>
    );
  }
}

export default UserPhoneNumber;
