import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ContactList from "./ContactList";
import { bindActionCreators } from "redux";
import { getUserContacts } from "calls/actions/contacts";


function mapStateToProps({ calls }) {
  return {
    contacts: calls.contacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserContacts,
  }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactList)
);