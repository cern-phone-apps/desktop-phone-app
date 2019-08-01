import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { callActions } from 'dial-core';
import dialBackendApi from '../../../services/api';

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
      getUserContacts: dialBackendApi().getUserContacts,
      removeUserContact: dialBackendApi().removeUserContact,
      findUserById: dialBackendApi().findUserById
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailsScreen);
