import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_ENDPOINT } from 'react-native-dotenv';

import { usersActionFactory, contactsActionFactory } from 'dial-core';

import SearchUsersScreen from './SearchUsersScreen';

function mapStateToProps(state) {
  const { calls } = state;
  return {
    searching: calls.search.serching,
    selection: calls.contacts.getContacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      searchUsers: usersActionFactory(API_ENDPOINT, 'mobile').searchUsers,
      addUser: contactsActionFactory(API_ENDPOINT, 'mobile').addUserContact,
      getSelectedUsers: contactsActionFactory(API_ENDPOINT, 'mobile')
        .getUserContacts
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUsersScreen);
