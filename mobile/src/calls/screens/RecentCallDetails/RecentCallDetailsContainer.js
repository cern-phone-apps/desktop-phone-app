import { connect } from 'react-redux';
import RecentCallDetails from './RecentCallDetails';

function mapStateToProps(state) {
  const { calling } = state.calls.call;
  return {
    calling
  };
}

export default connect(mapStateToProps)(RecentCallDetails);
