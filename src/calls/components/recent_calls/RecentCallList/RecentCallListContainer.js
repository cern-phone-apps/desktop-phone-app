import { connect } from 'react-redux';
import RecentCallList from './RecentCallList';

function mapStateToProps({ recent }) {
  return {
    recentCalls: recent.recentCalls
  };
}

export default connect(mapStateToProps)(RecentCallList);
