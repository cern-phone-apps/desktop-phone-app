import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { AuthLoadingScreen } from './AuthLoadingScreen';

import dialBackendApi from '../../../services/api';

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
      getMe: dialBackendApi().getMe
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
