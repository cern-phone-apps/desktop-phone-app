import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Contact from 'calls/components/contacts/Contact/Contact';
import { contactsActions, usersActionFactory } from 'dial-core';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectContact: contactsActions.selectContact,
      findUserById: usersActionFactory(process.env.REACT_APP_API_ENDPOINT)
        .findUserById
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Contact);
