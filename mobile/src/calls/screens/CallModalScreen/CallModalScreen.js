import React from 'react';
import PropTypes from 'prop-types';
import MakingCallScreenContainer from '../MakingCallScreen/MakingCallScreenContainer';
import ReceivingCallScreenContainer from '../ReceivingCallScreen/ReceivingCallScreenContainer';

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
  return null;
};

CallModalScreen.propTypes = {
  calling: PropTypes.bool.isRequired,
  receivingCall: PropTypes.bool.isRequired
};

export default CallModalScreen;
