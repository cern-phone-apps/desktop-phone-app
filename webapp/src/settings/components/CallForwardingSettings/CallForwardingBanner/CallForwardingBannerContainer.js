import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openSettingsModal } from 'settings/actions/modal';
import { bindActionCreators } from 'redux';
import dialBackendApi from 'services/api';
import CallForwardingBanner from './CallForwardingBanner';

function mapStateToProps({ callForwarding, numbers }) {
  return {
    status: callForwarding.status,
    activeNumber: numbers.activeNumber
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openSettingsModal,
      getCallForwardingStatus: dialBackendApi().getCallForwardingStatus
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CallForwardingBanner)
);
