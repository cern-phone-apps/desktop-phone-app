import { API_ENDPOINT } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withNavigation } from 'react-navigation';
import { authActionFactory } from 'dial-core';

import LogoutListComponent from './LogoutListComponent';
import { phoneService } from '../../../calls/providers/PhoneProvider/PhoneService';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: authActionFactory(API_ENDPOINT).logout
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(phoneService(LogoutListComponent)));
