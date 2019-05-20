import { connect } from 'react-redux';

import ConnectedScreen from './DialpadScreen';
import withOnGoingCallBanner from '../../../common/utils/calls';

function mapStateToProps(state) {
  const { call } = state.calls;
  return {
    receivingCall: call.receivingCall
  };
}

export default connect(mapStateToProps)(withOnGoingCallBanner(ConnectedScreen));
