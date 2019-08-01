import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withNavigation } from 'react-navigation';

import LogoutListComponent from './LogoutListComponent';
import { phoneService } from '../../../calls/providers/PhoneProvider/PhoneService';

import dialBackendApi from '../../../services/api';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: dialBackendApi().logout
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(phoneService(LogoutListComponent)));
