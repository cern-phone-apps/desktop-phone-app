import { connect } from 'react-redux';
import MakingCallScreen from './MakingCallScreen';

function mapStateToProps(state) {
  const { calling, onCall, tempRemote } = state.calls.call;
  return {
    onCall,
    calling,
    recipient: tempRemote
  };
}

export default connect(mapStateToProps)(MakingCallScreen);
