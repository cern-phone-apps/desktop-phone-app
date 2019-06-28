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
      }
    ];

    return (
      <View style={{ flex: 1 }}>
        {list.map((item, i) => (
          <ListItem
            key={i.toString()}
            title={item.title}
            leftIcon={{ name: item.icon, type: item.type }}
            onPress={() => item.onPress()}
          />
        ))}
        <DisconnectForm />
        <LogoutListComponentContainer />
      </View>
    );
  }
}
