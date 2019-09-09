import { connect } from 'react-redux';
import RateCallQuality from './RateCallQuality';

function mapStateToProps({ call }) {
  return {
      call: call.calling
  };
}

export default connect(mapStateToProps)(RateCallQuality);
