import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactAddButton from 'calls/components/contacts/ContactAddButton/ContactAddButton';
import { contactsActionFactory } from 'dial-core';

function mapStateToProps({ calls }) {
  return {
    contacts: calls.contacts.getContacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addUserContact: contactsActionFactory(process.env.REACT_APP_API_ENDPOINT)
        .addUserContact,
      removeUserContact: contactsActionFactory(
        process.env.REACT_APP_API_ENDPOINT
      ).removeUserContact,
      getUserContacts: contactsActionFactory(process.env.REACT_APP_API_ENDPOINT)
        .getUserContacts
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactAddButton);
