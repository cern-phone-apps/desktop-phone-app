import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';

import { callActions } from 'dial-core';
import ReceivingCallScreen from './ReceivingCallScreen';

function mapStateToProps(state) {
  const { calls } = state;
  return {
    receivingCall: calls.call.receivingCall,
    tempCaller: calls.call.tempRemote
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...callActions
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(ReceivingCallScreen));
