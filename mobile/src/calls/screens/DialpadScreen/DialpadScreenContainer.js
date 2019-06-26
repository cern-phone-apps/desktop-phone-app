import { connect } from 'react-redux';

import ConnectedScreen from './DialpadScreen';

function mapStateToProps(state) {
  const { call } = state.calls;
  return {
    receivingCall: call.receivingCall
  };
}

export default connect(mapStateToProps)(ConnectedScreen);
