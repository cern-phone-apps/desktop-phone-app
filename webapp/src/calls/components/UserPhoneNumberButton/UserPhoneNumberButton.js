import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";
import { buildRecipient} from "calls/utils/utils";
import { formatPhoneNumber } from "calls/utils/utils";

export class UserPhoneNumberButton extends Component {
  static propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    recipientName: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    phoneService: PropTypes.object.isRequired,
  };

  makeCall = () => {
    const { phoneNumber, recipientName } = this.props;

    const formattedNumber = formatPhoneNumber(phoneNumber);

    const recipient = {
      name: recipientName,
      phoneNumber: formattedNumber,
      incoming: false,
      missed: false
    };
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

export default UserPhoneNumberButton;
