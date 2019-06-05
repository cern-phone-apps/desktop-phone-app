import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CallsScreen from 'calls/screens/CallsScreen/CallsScreen';

function mapStateToProps({ calls }) {
  return {
    onCall: calls.call.onCall,
    receivingCall: calls.call.receivingCall,
    calling: calls.call.calling,
    displayDialpad: calls.dialpad.display,
    connected: calls.connection.connected,
    userSelected: calls.search.userSelected
  };
}

export const CallsScreenContainer = connect(
  mapStateToProps,
  null
)(CallsScreen);

export default withRouter(CallsScreenContainer);
