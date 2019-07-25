import { connect } from 'react-redux';
import MainHeader from './MainHeader';

function mapStateToProps({ call, connection, numbers }) {
  return {
    onCall: call.onCall,
    connected: connection.connected,
    calling: call.calling,
    activeNumber: numbers.activeNumber
  };
}

export default connect(mapStateToProps)(MainHeader);
