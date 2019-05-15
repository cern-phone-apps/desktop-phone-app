import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeEmergencyModal } from "calls/actions/contacts";
import { bindActionCreators } from "redux";
import ContactEmergencyModal from "calls/components/contacts/ContactEmergencyModal/ContactEmergencyModal";

function mapStateToProps({ calls }) {
  return {
    emergencyModalOpen: calls.contacts.emergencyModal.emergencyModalOpen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeEmergencyModal
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactEmergencyModal)
);