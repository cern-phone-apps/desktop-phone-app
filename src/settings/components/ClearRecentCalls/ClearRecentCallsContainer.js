import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { recentCallsActions } from 'dial-core';
import ClearRecentCallsSection from './ClearRecentCalls';

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
)(ClearRecentCallsSection);

export default RecentCallsContainer;
