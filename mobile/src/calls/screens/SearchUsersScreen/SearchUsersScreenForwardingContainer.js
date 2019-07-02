import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_ENDPOINT } from 'react-native-dotenv';

import { usersActionFactory, callForwardingActionFactory } from 'dial-core';

import SearchUsersScreen from './SearchUsersScreen';

function mapStateToProps(state) {
  const { calls, callForwarding } = state;
  return {
    searching: calls.search.serching,
    activeNumber: calls.numbers.activeNumber,
    callForwardingStatus: callForwarding.status['call-forwarding'],
    simultaneousRingingStatus: callForwarding.status['simultaneous-ring'],
    selection: callForwarding.status['destination-list']
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      searchUsers: usersActionFactory(API_ENDPOINT, 'mobile').searchUsers,
      enableSimultaneousRinging: callForwardingActionFactory(
        API_ENDPOINT,
        'mobile'
      ).enableSimultaneousRinging,
      enableCallForwarding: callForwardingActionFactory(API_ENDPOINT, 'mobile')
        .enableCallForwarding,
      getCallForwardingStatus: callForwardingActionFactory(
        API_ENDPOINT,
        'mobile'
      ).getCallForwardingStatus
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUsersScreen);
