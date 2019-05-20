import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_ENDPOINT } from 'react-native-dotenv';

import { callActions, contactsActionsFactory } from 'dial-core';
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
      ...contactsActionsFactory(API_ENDPOINT)
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withOnGoingCallBanner(ContactsScreen));
