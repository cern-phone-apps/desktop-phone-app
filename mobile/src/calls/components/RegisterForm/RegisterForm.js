import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

import { phoneService } from '../../providers/PhoneProvider/PhoneService';

export class RegisterForm extends React.Component {
  static propTypes = {
    phoneService: PropTypes.shape({
      disconnectUser: PropTypes.func.isRequired
    }).isRequired,
    phoneNumber: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  };

  /**
   * Register the user in the Telephony Backend
   */
  registerUser = () => {
    const { phoneService, phoneNumber, token } = this.props;
    console.log(`Registering user ${phoneNumber}`);

    phoneService.registerUser(phoneNumber, token);
  };

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    const { phoneNumber } = this.props;
    return (
      <ListItem
        title={`${phoneNumber}`}
        chevron
        leftIcon={{ name: 'phone', type: 'font-awesome' }}
        bottomDivider
        onPress={this.registerUser}
      />
    );
  }
}

export default phoneService(RegisterForm);
