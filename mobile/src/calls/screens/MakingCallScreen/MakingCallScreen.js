import React from 'react';
import { Icon, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import HangupForm from '../../components/HangupForm/HangupForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10
  },
  iconTextContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function MakingCallScreen({ caller }) {
  return (
    <View style={[styles.container]}>
      <View style={[styles.iconTextContainer]}>
        <Text h2>Calling...</Text>
      </View>
      <View style={[styles.iconTextContainer]}>
        <Icon name="phone" size={30} />
        <Text h4>{caller.phoneNumber}</Text>
      </View>
      <HangupForm />
    </View>
  );
}

MakingCallScreen.propTypes = {
  caller: PropTypes.shape({
    phoneNumber: PropTypes.string
  }).isRequired
};

export default MakingCallScreen;
