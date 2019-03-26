import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { unSelectContact, getUserProfileById } from "calls/actions/contacts";
import ContactProfileModal from "calls/components/ContactProfileModal/ContactProfileModal";

function mapStateToProps({ calls }) {
  return {
    modalOpen: calls.contacts.selectedModal.modalOpen,
    selectedContact: calls.contacts.selectedModal.selectedContact
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      unSelectContact,
      getUserProfileById
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactProfileModal)
);
