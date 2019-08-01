import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authActions } from 'dial-core';
import LoginScreen from './LoginScreen';

function mapStateToProps(state) {
  const { auth } = state;
  return {
    ...auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startAuth: authActions.startAuth
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
