import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import DisconnectForm from '../../../calls/components/DisconnectForm/DisconnectForm';
import LogoutListComponentContainer from '../../components/logout/LogoutListComponentContainer';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    const { navigation } = this.props;
    const list = [
      {
        title: 'Profile',
        icon: 'person',
        onPress: () => {
          navigation.navigate('Profile');
        }
      },
      {
        title: 'Call Forwarding',
        icon: 'phone-forwarded',
        onPress: () => {
          navigation.navigate('CallForwarding');
        }
      }
    ];

    return (
      <View style={{ flex: 1 }}>
        {list.map(({ title, icon, onPress }, index) => (
          <ListItem
            key={index.toString()}
            title={title}
            leftIcon={{ name: icon }}
            onPress={onPress}
          />
        ))}
        <DisconnectForm />
        <LogoutListComponentContainer />
      </View>
    );
  }
}
