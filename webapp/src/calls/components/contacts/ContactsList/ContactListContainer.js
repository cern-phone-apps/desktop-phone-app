import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { contactsActionFactory } from 'dial-core';
import config from 'config';
import ContactList from './ContactList';

const apiEndpoint = config.api.ENDPOINT;

function mapStateToProps({ calls }) {
  return {
    contacts: calls.contacts.getContacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserContacts: contactsActionFactory(apiEndpoint).getUserContacts
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList);
