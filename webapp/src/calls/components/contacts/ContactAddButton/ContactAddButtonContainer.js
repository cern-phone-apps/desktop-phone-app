import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactAddButton from 'calls/components/contacts/ContactAddButton/ContactAddButton';

import dialBackendApi from 'services/api';

function mapStateToProps({ contacts }) {
  return {
    contacts: contacts.getContacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addUserContact: dialBackendApi().addUserContact,
      removeUserContact: dialBackendApi().removeUserContact,
      getUserContacts: dialBackendApi().getUserContacts
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactAddButton);
