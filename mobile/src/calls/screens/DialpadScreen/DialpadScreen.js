import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import MakeCallForm from '../../components/DialpadForm/DialpadForm';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  makeCallForm: {
    position: 'absolute',
    bottom: 0,
    transform: [{ translateY: 1 }],
    paddingBottom: 10
  }
});

const DialpadScreen = ({ receivingCall, navigation }) => {
  if (receivingCall) {
    navigation.navigate('Calling');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CERN Phone Mobile</Text>
      <View style={styles.makeCallForm}>
        <MakeCallForm />
      </View>
    </View>
  );
};

export default withNavigation(DialpadScreen);
