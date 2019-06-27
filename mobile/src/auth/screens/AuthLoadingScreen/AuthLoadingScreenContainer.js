import { connect } from 'react-redux';

import { meActionFactory } from 'dial-core';
import { bindActionCreators } from 'redux';
import { API_ENDPOINT } from 'react-native-dotenv';
import { AuthLoadingScreen } from './AuthLoadingScreen';

function mapStateToProps(state) {
  const { auth } = state;
  return {
    loggedIn: auth.loggedIn,
    token: auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMe: meActionFactory(API_ENDPOINT, 'mobile').getMe
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
