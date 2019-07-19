import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { openSettingsModal } from 'settings/actions/modal';
import SettingsButton from './SettingsButton';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openSettingsModal
    },
    dispatch
  );
}

export const SettingsButtonConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsButton);

export default withRouter(SettingsButtonConnected);
