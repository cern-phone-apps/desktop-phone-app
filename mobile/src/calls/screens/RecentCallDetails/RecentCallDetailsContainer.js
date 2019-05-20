import { connect } from 'react-redux';
import RecentCallDetails from './RecentCallDetails';
import withOnGoingCallBanner from '../../../common/utils/calls';

function mapStateToProps(state) {
  const { calling } = state.calls.call;
  return {
    calling
  };
}

export default connect(mapStateToProps)(
  withOnGoingCallBanner(RecentCallDetails)
);
