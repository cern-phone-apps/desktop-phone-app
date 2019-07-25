import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { callActions, dialpadActions } from 'dial-core';
import Dialpad from './Dialpad';

function mapStateToProps({ dialpad }) {
  return {
    dialpadValue: dialpad.value
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      makeCall: callActions.setMakeCallRequest,
      updateDialpadValue: dialpadActions.updateDialpadValue
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialpad);
