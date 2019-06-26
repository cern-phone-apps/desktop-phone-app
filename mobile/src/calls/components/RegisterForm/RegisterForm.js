import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

export default class RegisterForm extends React.Component {
  static propTypes = {
    phoneService: PropTypes.shape({
      disconnectUser: PropTypes.func.isRequired
    }).isRequired,
    phoneNumber: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    setActiveNumber: PropTypes.func.isRequired
  };

  /**
   * Register the user in the Telephony Backend
   */
  registerUser = () => {
    const { phoneService, phoneNumber, token, setActiveNumber } = this.props;
    console.log(`Registering user ${phoneNumber}`);

    setActiveNumber(phoneNumber);
    phoneService.authenticateUser(phoneNumber, token);
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
        topDivider
        onPress={this.registerUser}
      />
    );
  }
}
