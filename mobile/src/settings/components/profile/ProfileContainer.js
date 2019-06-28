import { connect } from 'react-redux';
import Profile from './Profile';

function mapStateToProps({ user }) {
  return {
    user
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
