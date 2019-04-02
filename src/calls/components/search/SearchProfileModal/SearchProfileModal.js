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
import UserPhoneNumberButtonContainer from "calls/components/UserPhoneNumberButton/UserPhoneNumberButtonContainer";
import { UserProfileExtraInfo } from "calls/components/UserProfile/UserProfile";
import ContactAddButtonContainer from "calls/components/contacts/ContactAddButton/ContactAddButtonContainer";


export class SearchProfileModal extends Component {
  static propTypes = {
    user: PropTypes.object,
    userSelected: PropTypes.bool.isRequired,
    unSelectUser: PropTypes.func.isRequired,
  };

  // async componentDidUpdate(prevProps, prevState, snapshot) {
  //   const { getUserProfile, selectedContact } = this.props;
  //
  //   if (this.props.modalOpen) {
  //     if (!this.state.fetching) {
  //       this.setState({ fetching: true });
  //     }
  //     const result = await getUserProfileById(selectedUser.personId);
  //     if (result && result.payload) {
  //       if (
  //         !this.state.profile ||
  //         result.payload.result.personId !== this.state.profile.personId
  //       ) {
  //         this.setState({ profile: result.payload.result, fetching: false });
  //       }
  //     }
  //   }
  // }

  handleClose = () => {
    const { unSelectUser } = this.props;
    unSelectUser();
  };

  render() {
    const { userSelected, user } = this.props;
    return (
      <Modal
        dimmer={`blurring`}
        size="tiny"
        open={userSelected}
        onClose={this.handleClose}
        closeIcon
      >
        <Header>
          <Icon name="user" color={"blue"} />
          <Header.Content>
            <Header as="h5" floated={"right"}>
              <ContactAddButtonContainer contact={user} />
            </Header>
            {user ? user.displayName : ""}
            <Header.Subheader>
              {user ? formatUserOrganization(user) : ""}
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Modal.Content>
          {user && (
            <UserProfileExtraInfo
              mail={user.mail}
              physicalDeliveryOfficeName={
                user.physicalDeliveryOfficeName
              }
            />
          )}
          {!user ? (
            <Segment basic>
              <Dimmer active inverted>
                <Loader inverted size={"large"} />
              </Dimmer>
            </Segment>
          ) : (
            user.phones.map((phone, index) => {
              if (phone.number !== null) {
                return (
                  <UserPhoneNumberButtonContainer
                    key={`button-${index}`}
                    phoneNumber={phone.number}
                    icon={phone.phoneType}
                    recipientName={user.displayName}
                  />
                );
              } else return null;
            })
          )}
        </Modal.Content>
      </Modal>
    );
  }
}

export default SearchProfileModal;
