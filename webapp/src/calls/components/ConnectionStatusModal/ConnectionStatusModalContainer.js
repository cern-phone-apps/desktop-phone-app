import { connect } from 'react-redux';

import { withPhoneService } from 'calls/providers/PhoneProvider/PhoneService';
import { bindActionCreators } from 'redux';
import dialBackendApi from 'services/api';
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
      setUserDoNotDisturb: dialBackendApi().setUserDoNotDisturb,
      getMe: dialBackendApi().getMe
    },
    dispatch
  );
}

export const ConnectionStatusModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionStatusModal);

export const ConnectionStatusModalContainerWithPhoneService = withPhoneService(
  ConnectionStatusModalContainer
);

export default ConnectionStatusModalContainerWithPhoneService;
