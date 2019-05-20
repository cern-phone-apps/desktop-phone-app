import { connect } from 'react-redux';
import OnCallInfo from './OnCallInfo';

function mapStateToProps({ calls: { call } }) {
  return {
    remote: call.receivingCall ? call.caller : call.recipient
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnCallInfo);
