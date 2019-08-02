import { connect } from 'react-redux';

import { withPhoneService } from 'calls/providers/PhoneProvider/PhoneService';
import { bindActionCreators } from 'redux';
import dialBackendApi from 'services/api';
import ConnectionStatusModal from './ConnectionStatusModal';

function mapStateToProps({ connection, numbers, status }) {
  return {
    connected: connection.connected,
    activeNumber: numbers.activeNumber,
    doNotDisturb: status.doNotDisturb
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
