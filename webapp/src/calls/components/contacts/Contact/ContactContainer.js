import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Contact from 'calls/components/contacts/Contact/Contact';
import { contactsActions, usersActionFactory } from 'dial-core';

import config from 'config';

const apiEndpoint = config.api.ENDPOINT;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectContact: contactsActions.selectContact,
      findUserById: usersActionFactory(apiEndpoint, "desktop").findUserById
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Contact);
