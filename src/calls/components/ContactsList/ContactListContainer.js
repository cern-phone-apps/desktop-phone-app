import { connect } from "react-redux";
import ContactList from "./ContactList";
import { bindActionCreators } from "redux";
import { getUserContacts } from "calls/actions/contacts";


function mapStateToProps({ calls }) {
  return {
    contacts: calls.contacts.getContacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserContacts,
  }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactList);