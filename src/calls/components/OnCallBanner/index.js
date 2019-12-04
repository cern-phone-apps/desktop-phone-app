import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import OnCallBanner from './OnCallBanner';

function mapStateToProps({ call }) {
  return {
    caller: call.remote
  };
}

export default withRouter(connect(mapStateToProps, null)(OnCallBanner));
