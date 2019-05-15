import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimmer,
  Header,
  Icon,
  Loader,
  Modal,
  Segment
} from "semantic-ui-react";
import { formatUserOrganization } from "calls/utils/formatters";
import UserPhoneNumberButtonContainer from "calls/components/UserPhoneNumberButton/UserPhoneNumberButtonContainer";
import ContactAddButtonContainer from "calls/components/contacts/ContactAddButton/ContactAddButtonContainer";
import { UserProfileExtraInfo } from "calls/components/UserProfileExtraInfo/UserProfileExtraInfo";

function ContactProfileModalContent (props) {
  return <Modal.Content>
    {props.profile && (
      <UserProfileExtraInfo
        mail={props.profile.mail}
        physicalDeliveryOfficeName={
          props.profile.physicalDeliveryOfficeName
        }
      />
    )}
    {!props.profile ? (
      <Segment basic>
        <Dimmer active inverted>
          <Loader inverted size={"large"}/>
        </Dimmer>
      </Segment>
    ) : (
      props.profile.phones.map((phone, index) => {
        if (phone.number !== null) {
          return (
            <UserPhoneNumberButtonContainer
              key={`button-${index}`}
              phoneNumber={phone.number}
              icon={phone.phoneType}
              recipientName={props.profile.displayName}
            />
          );
        } else return null;
      })
    )}
  </Modal.Content>;
}

ContactProfileModalContent.propTypes = {
  profile: PropTypes.any,
  f: PropTypes.func
};

function ContactProfileModalHeader (props) {
  return <Header>
    <Icon name="user" color={"blue"}/>
    <Header.Content>
      <Header as="h5" floated={"right"}>
        <ContactAddButtonContainer contact={props.contact}/>
      </Header>
      {props.contact ? props.contact.displayName : ""}
      <Header.Subheader>
        {props.contact ? formatUserOrganization(props.contact) : ""}
      </Header.Subheader>
    </Header.Content>
  </Header>;
}

ContactProfileModalHeader.propTypes = { contact: PropTypes.any };

export class ContactProfileModal extends Component {
  static propTypes = {
    selectedContact: PropTypes.object,
    modalOpen: PropTypes.bool.isRequired,
    unSelectContact: PropTypes.func.isRequired,
    getUserProfileById: PropTypes.func.isRequired
  };

  state = {
    profile: undefined,
    fetching: true
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { getUserProfileById, selectedContact } = this.props;

    if (this.props.modalOpen) {
      if (!this.state.fetching) {
        this.setState({ fetching: true });
      }
      const result = await getUserProfileById(selectedContact.personId);
      if (result && result.payload && result.payload.result) {
        if (
          !this.state.profile ||
          result.payload.result.personId !== this.state.profile.personId
        ) {
          this.setState({ profile: result.payload.result, fetching: false });
        }
      }
    }
  }

  handleClose = () => {
    const { unSelectContact } = this.props;
    unSelectContact();
  };

  render() {
    const { modalOpen, selectedContact } = this.props;
    return (
      <Modal
        dimmer={`blurring`}
        size="tiny"
        open={modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <ContactProfileModalHeader contact={selectedContact}/>
        <ContactProfileModalContent profile={this.state.profile}/>
      </Modal>
    );
  }
}

export default ContactProfileModal;
