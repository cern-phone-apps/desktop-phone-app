import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%'
  },
  banner: {
    backgroundColor: '#333',
    height: 40
  },
  bannerText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  content: {
    justifyContent: 'space-between',
    flex: 1
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    flex: 2
  },
  number: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    flex: 2
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 4
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#ddd',
    marginLeft: 10
  },
  answerButton: {
    backgroundColor: '#0fd859',
    marginLeft: 0
  },
  rejectButton: {
    backgroundColor: '#ff0000'
  }
});

const ReceivingCallScreen = ({ tempCaller, navigation, phoneService }) => {
  const answerCall = () => {
    phoneService.answer();
    navigation.navigate('AppTabs');
  };

  const rejectCall = () => {
    phoneService.rejectIncomingCall();
    navigation.navigate('Recent');
  };

  return (
    tempCaller && (
      <View style={styles.layout}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Receiving a Call</Text>
        </View>
        <View style={styles.content}>
          {tempCaller.name && (
            <Text style={styles.name}>{tempCaller.name}</Text>
          )}
          <Text style={styles.number}>{tempCaller.phoneNumber}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.answerButton]}
              onPress={answerCall}
            >
              <Icon name="phone" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={rejectCall}
            >
              <Icon
                name="phone-hangup"
                type="material-community"
                size={25}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.error('Not implemented!')}
            >
              <Icon name="keyboard-arrow-down" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  );
};

ReceivingCallScreen.propTypes = {
  tempCaller: PropTypes.shape({
    name: PropTypes.string,
    phoneNumber: PropTypes.string
  }),
  setCallFinished: PropTypes.func.isRequired,
  phoneService: PropTypes.shape({
    makeCall: PropTypes.func.isRequired,
    answer: PropTypes.func.isRequired
  }).isRequired
};

ReceivingCallScreen.defaultProps = {
  tempCaller: null
};

export default withPhoneService(ReceivingCallScreen);
