import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { dialpadActions, searchActions, callActions } from 'dial-core';

import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import { CallerDialpad } from './CallerDialpad';

function mapStateToProps({ dialpad }) {
  return {
    dialpadValue: dialpad.value
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      makeCall: callActions.makeCall,
      updateDialpadValue: dialpadActions.updateDialpadValue,
      unSelectUser: searchActions.unSelectUser
    },
    dispatch
  );
}

export const ConnectedDialpad = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallerDialpad);

export default withPhoneService(ConnectedDialpad);
