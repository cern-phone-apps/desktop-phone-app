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
import ContactAddButtonContainer from "calls/components/contacts/ContactAddButton/ContactAddButtonContainer";
import { UserProfileExtraInfo } from "calls/components/UserProfileExtraInfo/UserProfileExtraInfo";


export class SearchProfileModal extends Component {
  static propTypes = {
    user: PropTypes.object,
    userSelected: PropTypes.bool.isRequired,
    unSelectUser: PropTypes.func.isRequired,
  };

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
