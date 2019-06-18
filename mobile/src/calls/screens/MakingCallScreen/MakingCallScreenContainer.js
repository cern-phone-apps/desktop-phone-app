import { connect } from 'react-redux';
import MakingCallScreen from './MakingCallScreen';

function mapStateToProps(state) {
  const { calling, onCall, tempCaller } = state.calls.call;
  return {
    onCall,
    calling,
    caller: tempCaller
  };
}

export default connect(mapStateToProps)(MakingCallScreen);
