import { connect } from 'react-redux';
import { OnCallScreen } from './OnCallScreen';

function mapStateToProps({ connection, call, search }) {
  return {
    connected: connection.connected,
    onCall: call.onCall,
    calling: call.calling,
    userSelected: search.userSelected
  };
}

export default connect(mapStateToProps)(OnCallScreen);
