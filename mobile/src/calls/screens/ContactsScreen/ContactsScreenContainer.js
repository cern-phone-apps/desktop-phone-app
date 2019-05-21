import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_ENDPOINT } from 'react-native-dotenv';

import {
  callActions,
  usersActionFactory,
  contactsActionFactory
} from 'dial-core';
import ContactsScreen from './ContactsScreen';
import withOnGoingCallBanner from '../../../common/utils/calls';

function mapStateToProps(state) {
  const { contacts } = state;
  return {
    ...contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...callActions,
      getUserContacts: usersActionFactory(API_ENDPOINT).getUserContacts,
      removeUserContact: contactsActionFactory(API_ENDPOINT).removeUserContact
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withOnGoingCallBanner(ContactsScreen));
