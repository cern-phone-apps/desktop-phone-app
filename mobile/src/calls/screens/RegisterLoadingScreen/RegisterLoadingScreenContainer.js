import { connect } from 'react-redux';
import { RegisterLoadingScreen } from './RegisterLoadingScreen';

function mapStateToProps(state) {
  const { connection } = state.calls;
  return {
    connected: connection ? connection.connected : false
  };
}

export default connect(mapStateToProps)(RegisterLoadingScreen);
