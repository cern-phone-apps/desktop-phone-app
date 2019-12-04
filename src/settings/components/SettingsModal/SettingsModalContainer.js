import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { openSettingsModal, closeSettingsModal } from 'settings/actions/modal';
import SettingsModal from 'settings/components/SettingsModal/SettingsModal';

function mapStateToProps({ settings, call }) {
  return {
    modalOpen: settings.modal.modalOpen,
    onCall: call.onCall
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openSettingsModal,
      closeSettingsModal
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SettingsModal)
);
