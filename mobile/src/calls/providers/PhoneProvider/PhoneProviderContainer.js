import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  connectionActions,
  callActions,
  recentCallsActions,
  authActions
} from 'dial-core';
import dialBackendApi from '../../../services/api';

import { PhoneProvider } from './PhoneProvider';
import { phoneService } from './PhoneService';

export function mapStateToProps({ call, auth, status }) {
  return {
    authToken: auth.authToken,
    doNotDisturb: status.doNotDisturb,
    call,
    toneToken: auth.toneToken
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...authActions,
      logout: dialBackendApi().logout,
      ...connectionActions,
      ...callActions,
      ...recentCallsActions
    },
    dispatch
  );
}

export default phoneService(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhoneProvider)
);
