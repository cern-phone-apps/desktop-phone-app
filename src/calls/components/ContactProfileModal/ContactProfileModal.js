import React, { Component } from "react";
import PropTypes from "prop-types";
import {
 // Button,
  Dimmer,
  Header,
  Icon,
  Loader,
  Modal,
  Segment
} from "semantic-ui-react";
import { formatUserOrganization } from "calls/utils/formatters";
//import { errorMessage, logMessage } from "common/utils/logs";
import UserPhoneNumberButtonContainer from "calls/components/UserPhoneNumberButton/UserPhoneNumberButtonContainer";
import { UserProfileExtraInfo } from "calls/components/UserProfile/UserProfile";


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
      if (result && result.payload) {
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
        <Header>
          <Icon name="user" color={"blue"} />
          <Header.Content>
            {selectedContact ? selectedContact.displayName : ""}
            <Header.Subheader>
              {selectedContact ? formatUserOrganization(selectedContact) : ""}
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Modal.Content>
          {this.state.profile && (
            <UserProfileExtraInfo
              mail={this.state.profile.mail}
              physicalDeliveryOfficeName={
                this.state.profile.physicalDeliveryOfficeName
              }
            />
          )}
          {!this.state.profile ? (
            <Segment basic>
              <Dimmer active inverted>
                <Loader inverted size={"large"} />
              </Dimmer>
            </Segment>
          ) : (
            this.state.profile.phones.map((phone, index) => {
              if (phone.number !== null) {
                return (
                  <UserPhoneNumberButtonContainer
                    key={`button-${index}`}
                    phoneNumber={phone.number}
                    icon={phone.phoneType}
                    recipientName={this.state.profile.displayName}
                  />
                );
              }
            })
          )}
        </Modal.Content>
      </Modal>
    );
  }
}

export default ContactProfileModal;
