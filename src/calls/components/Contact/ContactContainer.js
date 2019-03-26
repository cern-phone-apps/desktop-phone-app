import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectContact } from "calls/actions/contacts";
import { bindActionCreators } from "redux";

import Contact from "calls/components/Contact/Contact";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectContact
    },
    dispatch
  );
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Contact)
);
