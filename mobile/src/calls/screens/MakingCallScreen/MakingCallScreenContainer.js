import { connect } from 'react-redux';
import MakingCallScreen from './MakingCallScreen';

function mapStateToProps(state) {
  const { calling, inCall, recipient } = state.calls.call;
  return {
    inCall,
    calling,
    recipient
  };
}

export default connect(mapStateToProps)(MakingCallScreen);
