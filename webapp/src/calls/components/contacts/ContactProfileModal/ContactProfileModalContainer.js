import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { contactsActions } from 'dial-core';
import ContactProfileModal from 'calls/components/contacts/ContactProfileModal/ContactProfileModal';

function mapStateToProps({ contacts, profile }) {
  return {
    modalOpen: contacts.modal.modalOpen,
    selectedContact: contacts.modal.selectedContact,
    profile: profile.profile,
    fetching: profile.fetching
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
