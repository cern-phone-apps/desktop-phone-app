import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { buildcaller, formatPhoneNumber } from 'calls/utils/utils';
import { CallButton } from 'calls/components/CallButton/CallButtonContainer';

export class UserPhoneNumberButton extends Component {
  static propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    callerName: PropTypes.string,
    icon: PropTypes.string.isRequired,
    phoneService: PropTypes.shape({
      makeCall: PropTypes.func.isRequired
    }).isRequired,
    callBack: PropTypes.func
  };

  static defaultProps = {
    callBack: () => {},
    callerName: ''
  };

  makeCall = () => {
    const { phoneNumber, callerName, callBack, phoneService } = this.props;

    const formattedNumber = formatPhoneNumber(phoneNumber);

    const caller = {
      name: callerName,
      phoneNumber: formattedNumber,
      incoming: false,
      missed: false
    };
    // To hide the modal if required
    callBack();
    phoneService.makeCall(buildcaller(caller));
  };

  render() {
    const { icon, phoneNumber } = this.props;
    return (
      <CallButton
        type="modal"
        content={
          <>
            <Icon name={icon} /> {phoneNumber}
          </>
        }
        clickHandler={this.makeCall}
      />
    );
  }
}

export default UserPhoneNumberButton;
