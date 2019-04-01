import { connect } from "react-redux";
import { selectContact } from "calls/actions/contacts";
import { bindActionCreators } from "redux";

import Contact from "calls/components/Contact/Contact";

function mapStateToProps({ calls }) {
  return {
    contact: calls.contacts.contact
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectContact
    },
    dispatch
  );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Contact);
