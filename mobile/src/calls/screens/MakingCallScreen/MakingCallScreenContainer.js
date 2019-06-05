import { connect } from 'react-redux';
import MakingCallScreen from './MakingCallScreen';

function mapStateToProps(state) {
  const { calling, onCall, caller } = state.calls.call;
  return {
    onCall,
    calling,
    caller
  };
}

export default connect(mapStateToProps)(MakingCallScreen);
