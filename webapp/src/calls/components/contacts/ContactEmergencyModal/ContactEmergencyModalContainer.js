import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ContactEmergencyModal from 'calls/components/contacts/ContactEmergencyModal/ContactEmergencyModal';
import { contactsActions } from 'dial-core';

function mapStateToProps({ calls }) {
  return {
    emergencyModalOpen: calls.contacts.emergencyModal.emergencyModalOpen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeEmergencyModal: contactsActions.closeEmergencyModal
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactEmergencyModal)
);
