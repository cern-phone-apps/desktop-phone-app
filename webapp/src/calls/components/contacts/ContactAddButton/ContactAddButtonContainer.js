import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactAddButton from 'calls/components/contacts/ContactAddButton/ContactAddButton';
import { contactsActionFactory } from 'dial-core';

import config from 'config';

const apiEndpoint = config.api.ENDPOINT;

function mapStateToProps({ calls }) {
  return {
    contacts: calls.contacts.getContacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addUserContact: contactsActionFactory(apiEndpoint, "desktop").addUserContact,
      removeUserContact: contactsActionFactory(apiEndpoint, "desktop").removeUserContact,
      getUserContacts: contactsActionFactory(apiEndpoint, "desktop").getUserContacts
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactAddButton);
