import { connect } from "react-redux";
import { selectContact } from "calls/actions/contacts";
import { bindActionCreators } from "redux";

import Contact from "calls/components/contacts/Contact/Contact";


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectContact
    },
    dispatch
  );
}

export default connect(
    null,
    mapDispatchToProps
  )(Contact);
