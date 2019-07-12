import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Contact from 'calls/components/contacts/Contact/Contact';
import { contactsActions } from 'dial-core';

import dialBackendApi from 'services/api';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectContact: contactsActions.selectContact,
      findUserById: dialBackendApi.findUserById
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Contact);
