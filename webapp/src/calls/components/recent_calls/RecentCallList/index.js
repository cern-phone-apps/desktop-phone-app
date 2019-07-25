import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RecentCallList from './RecentCallList';

function mapStateToProps({ recent }) {
  return {
    recentCalls: recent.recentCalls
  };
}

export default withRouter(connect(mapStateToProps)(RecentCallList));
