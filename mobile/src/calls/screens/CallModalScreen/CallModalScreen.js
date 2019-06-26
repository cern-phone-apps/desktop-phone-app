import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MakingCallScreenContainer from '../MakingCallScreen/MakingCallScreenContainer';
import ReceivingCallScreenContainer from '../ReceivingCallScreen/ReceivingCallScreenContainer';

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'column',
    height: '100%'
  }
});

const CallModalScreen = ({ calling, receivingCall, navigation }) => {
  if (!calling && !receivingCall) {
    navigation.pop();
  }

  if (receivingCall) {
    return <ReceivingCallScreenContainer />;
  }

  if (calling) {
    return <MakingCallScreenContainer />;
  }

  // should be unreachable
  return (
    <View style={styles.layout}>
      <ActivityIndicator size="large" />
    </View>
  );
};

CallModalScreen.propTypes = {
  calling: PropTypes.bool.isRequired,
  receivingCall: PropTypes.bool.isRequired
};

export default CallModalScreen;
