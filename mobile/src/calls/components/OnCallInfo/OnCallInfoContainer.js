import { connect } from 'react-redux';
import OnCallInfo from './OnCallInfo';

function mapStateToProps({ calls: { call } }) {
  return {
    remote: call.caller
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnCallInfo);
