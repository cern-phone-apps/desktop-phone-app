import { connect } from 'react-redux';
import { meActionFactory, statusActionFactory } from 'dial-core';

import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
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
      setUserDoNotDisturb: statusActionFactory(
        process.env.REACT_APP_API_ENDPOINT
      ).setUserDoNotDisturb,
      getMe: meActionFactory(process.env.REACT_APP_API_ENDPOINT).getMe
    },
    dispatch
  );
}

export const ConnectionStatusModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionStatusModal);

export default withPhoneService(ConnectionStatusModalContainer);
