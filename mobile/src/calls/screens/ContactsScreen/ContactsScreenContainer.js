import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_ENDPOINT } from 'react-native-dotenv';

import { callActions, contactsActionFactory } from 'dial-core';
import ContactsScreen from './ContactsScreen';
import withOnGoingCallBanner from '../../../common/utils/calls';

function mapStateToProps(state) {
  const { calls } = state;
  return {
    contacts: calls.contacts.getContacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...callActions,
      getUserContacts: contactsActionFactory(API_ENDPOINT, 'mobile')
        .getUserContacts,
      removeUserContact: contactsActionFactory(API_ENDPOINT, 'mobile')
        .removeUserContact
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withOnGoingCallBanner(ContactsScreen));
