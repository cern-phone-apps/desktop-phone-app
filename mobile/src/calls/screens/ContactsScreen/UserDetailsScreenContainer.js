import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_ENDPOINT } from 'react-native-dotenv';

import {
  callActions,
  contactsActionFactory,
  usersActionFactory
} from 'dial-core';
import UserDetailsScreen from './UserDetailsScreen';

function mapStateToProps(state) {
  const { calls } = state;
  return {
    contacts: calls.contacts.getContacts.contacts,
    profile: calls.profile.profile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...callActions,
      getUserContacts: contactsActionFactory(API_ENDPOINT, 'mobile')
        .getUserContacts,
      removeUserContact: contactsActionFactory(API_ENDPOINT, 'mobile')
        .removeUserContact,
      findUserById: usersActionFactory(API_ENDPOINT, 'mobile').findUserById
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailsScreen);
