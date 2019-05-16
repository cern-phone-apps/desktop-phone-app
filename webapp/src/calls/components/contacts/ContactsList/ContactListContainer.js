import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { contactsActionFactory } from 'dial-core';
import ContactList from './ContactList';

function mapStateToProps({ calls }) {
  return {
    contacts: calls.contacts.getContacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserContacts: contactsActionFactory(process.env.REACT_APP_API_ENDPOINT)
        .getUserContacts
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList);
