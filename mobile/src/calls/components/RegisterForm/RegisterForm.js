import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

export class RegisterForm extends React.Component {
  static propTypes = {
    phoneService: PropTypes.shape({
      authenticateUser: PropTypes.func.isRequired
    }).isRequired,
    phoneNumber: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  /**
   * Register the user in the Telephony Backend
   */
  registerUser = () => {
    const { phoneService, phoneNumber, onSelect } = this.props;
    phoneService.authenticateUser(phoneNumber);
    onSelect();
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

export default withPhoneService(RegisterForm);
