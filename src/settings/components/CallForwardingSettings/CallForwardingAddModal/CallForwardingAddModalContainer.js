import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActions } from 'dial-core';

import dialBackendApi from 'services/api';
import { CallForwardingAddModal } from './CallForwardingAddModal';

function mapStateToProps({ callForwarding, user }) {
  return {
    localForwardList: callForwarding.localForwardList,
    localRingingList: callForwarding.localRingingList,
    status: callForwarding.status,
    me: user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addLocalForwardNumber: callForwardingActions.addLocalForwardNumber,
      addLocalRingingNumber: callForwardingActions.addLocalRingingNumber,
      searchUsers: dialBackendApi().searchUsers
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallForwardingAddModal);
