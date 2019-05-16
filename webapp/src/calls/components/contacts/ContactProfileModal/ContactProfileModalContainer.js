import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { contactsActions, contactsActionFactory } from 'dial-core';
import ContactProfileModal from 'calls/components/contacts/ContactProfileModal/ContactProfileModal';

function mapStateToProps({ calls }) {
  return {
    modalOpen: calls.contacts.modal.modalOpen,
    selectedContact: calls.contacts.modal.selectedContact
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      unSelectContact: contactsActions.unSelectContact,
      getUserProfileById: contactsActionFactory(
        process.env.REACT_APP_API_ENDPOINT
      ).getUserProfileById
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactProfileModal);
