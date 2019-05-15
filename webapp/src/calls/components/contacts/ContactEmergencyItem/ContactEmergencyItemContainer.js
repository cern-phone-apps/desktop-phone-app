import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { openEmergencyModal } from "calls/actions/contacts";
import { bindActionCreators } from "redux";
import ContactEmergencyItem from "calls/components/contacts/ContactEmergencyItem/ContactEmergencyItem";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openEmergencyModal
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