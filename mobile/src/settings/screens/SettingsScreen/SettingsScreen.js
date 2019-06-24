import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import DisconnectForm from '../../../calls/components/DisconnectForm/DisconnectForm';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    const list = [
      {
        title: 'Appointments',
        icon: 'av-timer'
      },
      {
        title: 'Trips',
        icon: 'flight-takeoff'
      }
    ];

    return (
      <View style={{ flex: 1 }}>
        {list.map((item, i) => (
          <ListItem
            key={i.toString()}
            title={item.title}
            leftIcon={{ name: item.icon }}
          />
        ))}
        <DisconnectForm />
      </View>
    );
  }
}
