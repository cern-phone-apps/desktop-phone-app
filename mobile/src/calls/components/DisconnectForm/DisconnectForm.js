import { StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

import { withNavigation } from 'react-navigation';
import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

export class DisconnectForm extends React.Component {
  static propTypes = {
    phoneService: PropTypes.object.isRequired
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
        key="disconnect"
        title="Disconnect"
        topDivider
        pad={16}
        leftIcon={{ name: 'logout', type: 'material-community' }}
      />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10
  },
  buttonTitle: {
    color: '#FF0000'
  }
});

export default withNavigation(withPhoneService(DisconnectForm));
