import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_ENDPOINT } from 'react-native-dotenv';

import { usersActionFactory, contactsActionFactory } from 'dial-core';

import SearchUsersScreen from './SearchUsersScreen';
import withOnGoingCallBanner from '../../../common/utils/calls';

const usersActions = usersActionFactory(API_ENDPOINT);

export default connect(
  ({ users, contacts: { contacts } }) => ({
    ...users,
    contacts
  }),
  dispatch =>
    bindActionCreators(
      {
        ...usersActions,
        addUserContact: contactsActionFactory(API_ENDPOINT).addUserContact,
        getUserContacts: usersActionFactory(API_ENDPOINT).getUserContacts
      },
      dispatch
    )
)(withOnGoingCallBanner(SearchUsersScreen));
