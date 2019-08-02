import { connect } from 'react-redux';
import CallForwardingFields from './CallForwardingFields';

function mapStateToProps({ callForwarding }) {
  return {
    localForwardList: callForwarding.localForwardList,
    fetchingStatus: callForwarding.fetchingStatus,
    status: callForwarding.status
  };
}

export default connect(
  mapStateToProps,
  null
)(CallForwardingFields);
