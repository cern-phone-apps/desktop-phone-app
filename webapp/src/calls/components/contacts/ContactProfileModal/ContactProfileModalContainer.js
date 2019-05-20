import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { contactsActions } from 'dial-core';
import ContactProfileModal from 'calls/components/contacts/ContactProfileModal/ContactProfileModal';

function mapStateToProps({ calls }) {
  return {
    modalOpen: calls.contacts.modal.modalOpen,
    selectedContact: calls.contacts.modal.selectedContact,
    profile: calls.profile.profile,
    fetching: calls.profile.fetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      unSelectContact: contactsActions.unSelectContact
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactProfileModal);
