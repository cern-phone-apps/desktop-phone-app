import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CallsScreen from 'calls/screens/CallsScreen/CallsScreen';

function mapStateToProps({ call, connection, dialpad, search }) {
  return {
    onCall: call.onCall,
    receivingCall: call.receivingCall,
    calling: call.calling,
    displayDialpad: dialpad.display,
    connected: connection.connected,
    userSelected: search.userSelected
  };
}

export const CallsScreenContainer = connect(
  mapStateToProps,
  null
)(CallsScreen);

export default withRouter(CallsScreenContainer);
