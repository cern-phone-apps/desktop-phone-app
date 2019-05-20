import React from 'react';
import { Text, View } from 'react-native';
import DisconnectForm from '../../../calls/components/DisconnectForm/DisconnectForm';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <DisconnectForm />
      </View>
    );
  }
}
