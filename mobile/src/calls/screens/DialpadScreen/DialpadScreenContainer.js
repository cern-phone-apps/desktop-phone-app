import { connect } from 'react-redux';

import ConnectedScreen from './DialpadScreen';

function mapStateToProps(state) {
  const { call } = state.calls;
  return {
    onCall: call.onCall,
    disabled: call.onCall,
    calling: call.calling,
    recipient: call.tempRemote
  };
}

export default connect(mapStateToProps)(ConnectedScreen);
