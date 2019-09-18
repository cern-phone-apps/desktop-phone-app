import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { recentCallsActions } from 'dial-core';
import ClearRecentCalls from './ClearRecentCalls';

function mapStateToProps({ recent }) {
  return {
    recentCalls: recent.recentCalls
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...recentCallsActions
    },
    dispatch
  );
}

export const RecentCallsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClearRecentCalls);

export default RecentCallsContainer;
