import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_ENDPOINT } from 'react-native-dotenv';

import { usersActionsFactory, contactsActionsFactory } from 'dial-core';

import SearchUsersScreen from './SearchUsersScreen';
import withOnGoingCallBanner from '../../../common/utils/calls';

const contactsActions = contactsActionsFactory(API_ENDPOINT);
const usersActions = usersActionsFactory(API_ENDPOINT);

export default connect(
  ({ users, contacts: { contacts } }) => ({
    ...users,
    contacts
  }),
  dispatch =>
    bindActionCreators(
      {
        ...usersActions,
        addUserContact: contactsActions.addUserContact,
        getUserContacts: contactsActions.getUserContacts
      },
      dispatch
    )
)(withOnGoingCallBanner(SearchUsersScreen));
