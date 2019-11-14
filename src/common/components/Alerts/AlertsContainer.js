import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import dialBackendApi from 'services/api';
import Alerts from './Alerts';

function mapStateToProps({ alerts }) {
  return {
    alerts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAlerts: dialBackendApi().getAlerts,
      alertSeen: dialBackendApi().alertSeen
    },
    dispatch
  );
}

export const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Alerts);

export default withRouter(MainPageContainer);
