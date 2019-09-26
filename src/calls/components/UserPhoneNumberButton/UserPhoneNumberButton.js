import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';
import { buildcaller, formatPhoneNumber } from 'calls/utils/utils';

import { CallButton } from '../CallButton/CallButton';

export class UserPhoneNumberButton extends Component {
  static propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    callerName: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    phoneService: PropTypes.object.isRequired
  };

  makeCall = () => {
    const { phoneNumber, callerName } = this.props;

    const formattedNumber = formatPhoneNumber(phoneNumber);

    const caller = {
      name: callerName,
      phoneNumber: formattedNumber,
      incoming: false,
      missed: false
    };
    this.props.phoneService.makeCall(buildcaller(caller));
  };

  render() {
    return (
      <Button fluid className="CalleeProfileNumber" onClick={this.makeCall}>
        <Icon name={this.props.icon} /> {this.props.phoneNumber}
      </Button>
    );
  }
}

export default UserPhoneNumberButton;
