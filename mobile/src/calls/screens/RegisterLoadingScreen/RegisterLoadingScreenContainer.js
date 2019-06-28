import { connect } from 'react-redux';
import RegisterLoadingScreen from './RegisterLoadingScreen';
import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

function mapStateToProps(state) {
  const {
    calls: { connection },
    auth: { activeNumber, toneToken }
  } = state;
  return {
    connected: connection ? connection.connected : false,
    activeNumber,
    token: toneToken
  };
}

export default connect(mapStateToProps)(
  withPhoneService(RegisterLoadingScreen)
);
