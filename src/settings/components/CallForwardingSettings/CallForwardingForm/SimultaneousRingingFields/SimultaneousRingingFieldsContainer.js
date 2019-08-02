import { connect } from 'react-redux';
import SimultaneousRingingFields from './SimultaneousRingingFields';

function mapStateToProps({ callForwarding }) {
  return {
    localRingingList: callForwarding.localRingingList,
    fetchingStatus: callForwarding.fetchingStatus,
    status: callForwarding.status
  };
}

export default connect(
  mapStateToProps,
  null
)(SimultaneousRingingFields);
