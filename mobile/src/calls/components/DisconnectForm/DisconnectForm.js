import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

import { withNavigation } from 'react-navigation';
import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

export class DisconnectForm extends React.Component {
  static propTypes = {
    phoneService: PropTypes.shape({
      disconnectUser: PropTypes.func.isRequired
    }).isRequired
  };

  /**
   * Register the user in the Telephony Backend
   */
  disconnectUserAction = async () => {
    // const { phoneNumber } = this.state;
    const { phoneService, navigation } = this.props;
    console.log(`Disconnecting user`);
    await phoneService.disconnectUser();
    navigation.navigate('Register');
  };

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    return (
      <ListItem
        onPress={this.disconnectUserAction}
        key="changeNumber"
        title="Change registered phone number"
        leftIcon={{ name: 'phone' }}
      />
    );
  }
}

export default withNavigation(withPhoneService(DisconnectForm));
