import { connect } from 'react-redux';
import { meActionFactory } from 'dial-core';

import { phoneService } from 'calls/providers/PhoneProvider/PhoneProvider';
import { setUserDoNotDisturb } from 'calls/actions/status';
import { bindActionCreators } from 'redux';
import ConnectionStatusModal from './ConnectionStatusModal';

function mapStateToProps({ calls }) {
  return {
    connected: calls.connection.connected,
    activeNumber: calls.numbers.activeNumber,
    doNotDisturb: calls.status.doNotDisturb
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setUserDoNotDisturb,
      getMe: meActionFactory(process.env.REACT_APP_API_ENDPOINT).getMe
    },
    dispatch
  );
}

export const ConnectionStatusModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionStatusModal);

export default phoneService(ConnectionStatusModalContainer);
