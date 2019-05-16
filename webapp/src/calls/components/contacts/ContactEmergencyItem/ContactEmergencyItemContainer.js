import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ContactEmergencyItem from 'calls/components/contacts/ContactEmergencyItem/ContactEmergencyItem';
import { contactsActions } from 'dial-core';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openEmergencyModal: contactsActions.openEmergencyModal
    },
    dispatch
  );
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ContactEmergencyItem)
);
