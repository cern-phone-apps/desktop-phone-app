import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { connectionActions, callActions, recentCallsActions } from 'dial-core';
import { PhoneProvider} from './PhoneProvider';
import { phoneService } from './PhoneService';

function mapStateToProps(state) {
  const { calls } = state;
  return {
    connected: calls.connection ? calls.connection.connected : false,
    call: calls.call
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
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
