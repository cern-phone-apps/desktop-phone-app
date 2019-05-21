import { connect } from 'react-redux';
import MakingCallScreen from './MakingCallScreen';

function mapStateToProps(state) {
  const { calling, onCall, recipient } = state.calls.call;
  return {
    onCall,
    calling,
    recipient
  };
}

export default connect(mapStateToProps)(MakingCallScreen);
