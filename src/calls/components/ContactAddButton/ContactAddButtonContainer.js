import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { addUserContact, getUserContacts, removeUserContact } from "calls/actions/contacts";
import ContactAddButton from "calls/components/ContactAddButton/ContactAddButton";


function mapStateToProps({ calls }) {
  return {
    contacts: calls.contacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addUserContact,
    removeUserContact,
    getUserContacts,
  }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactAddButton)
);