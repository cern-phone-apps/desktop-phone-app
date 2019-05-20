import { connect } from 'react-redux';

import CallModalScreen from './CallModalScreen';

function mapStateToProps(state) {
  const { call } = state.calls;
  return {
    inCall: call.inCall,
    calling: call.calling,
    receivingCall: call.receivingCall
  };
}

export default connect(mapStateToProps)(CallModalScreen);
