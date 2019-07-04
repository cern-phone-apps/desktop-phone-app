import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callForwardingActions, usersActionFactory } from 'dial-core';

import config from 'config';
import { CallForwardingAddModal } from './CallForwardingAddModal';


const apiEndpoint = config.api.ENDPOINT;

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
      searchUsers: usersActionFactory(apiEndpoint).searchUsers
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallForwardingAddModal);
