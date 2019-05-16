import { connect } from 'react-redux';
import PersonalInfo from 'settings/components/PersonalInfo/PersonalInfo';

function mapStateToProps({ user }) {
  return {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };
}

export default connect(
  mapStateToProps,
  null
)(PersonalInfo);
