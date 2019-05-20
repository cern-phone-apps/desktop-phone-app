import { connect } from 'react-redux';

import { AuthLoadingScreen } from './AuthLoadingScreen';

function mapStateToProps(state) {
  const { auth } = state;
  return {
    loggedIn: auth.loggedIn,
    token: auth.token
  };
}

export default connect(mapStateToProps)(AuthLoadingScreen);
