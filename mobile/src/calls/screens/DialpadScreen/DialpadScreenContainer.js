import { connect } from 'react-redux';

import ConnectedScreen from './DialpadScreen';

function mapStateToProps(state) {
  const { call } = state.calls;
  return {
    receivingCall: call.receivingCall,
    disabled: call.onCall
  };
}

export default connect(mapStateToProps)(ConnectedScreen);
