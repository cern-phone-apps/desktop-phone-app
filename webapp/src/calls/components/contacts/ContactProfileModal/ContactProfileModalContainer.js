import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { unSelectContact, getUserProfileById } from "calls/actions/contacts";
import ContactProfileModal from "calls/components/contacts/ContactProfileModal/ContactProfileModal";

function mapStateToProps({ calls }) {
  return {
    modalOpen: calls.contacts.modal.modalOpen,
    selectedContact: calls.contacts.modal.selectedContact
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactProfileModal);
