import { connect } from 'react-redux';
import { RegisterLoadingScreen } from './RegisterLoadingScreen';

function mapStateToProps({ connection }) {
  return {
    connected: connection ? connection.connected : false
  };
}

export default connect(mapStateToProps)(RegisterLoadingScreen);
