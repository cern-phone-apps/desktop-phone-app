import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Contact from 'calls/components/contacts/Contact/Contact';
import { contactsActions } from 'dial-core';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectContact: contactsActions.selectContact
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Contact);
