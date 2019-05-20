import React from 'react';
import PropTypes from 'prop-types';
import OnCallScreen from '../OnCallScreen/OnCallScreen';
import MakingCallScreenContainer from '../MakingCallScreen/MakingCallScreenContainer';
import ReceivingCallScreenContainer from '../ReceivingCallScreen/ReceivingCallScreenContainer';

const CallModalScreen = ({ inCall, calling, receivingCall, navigation }) => {
  if (!calling && !inCall && !receivingCall) {
    navigation.pop();
  }
  if (inCall) {
    return <OnCallScreen />;
  }

  if (receivingCall) {
    return <ReceivingCallScreenContainer />;
  }

  if (calling) {
    return <MakingCallScreenContainer />;
  }

  // should be unreachable
  return null;
};

CallModalScreen.propTypes = {
  inCall: PropTypes.bool.isRequired,
  calling: PropTypes.bool.isRequired,
  receivingCall: PropTypes.bool.isRequired
};

export default CallModalScreen;
