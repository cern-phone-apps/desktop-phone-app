import React, { Component } from "react";
import { Header, Icon, Loader, Segment, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { formatUserOrganization } from "calls/utils/formatters";
import ContactAddButtonContainer from "calls/components/contacts/ContactAddButton/ContactAddButtonContainer";
import { UserProfileCloseButtonContainer } from "calls/components/UserProfileCloseButton/UserProfileCloseButtonContainer";
import UserPhoneNumberContainer from "calls/components/UserPhoneNumberButton/UserPhoneNumberButtonContainer";

export function UserProfileExtraInfo(props) {
  return (
    <ul>
      <li>
        <Icon name={"mail"} /> {props.mail}
      </li>
      <li>
        <Icon name={"pin"} /> {props.physicalDeliveryOfficeName}
      </li>
    </ul>
  );
}

UserProfileExtraInfo.propTypes = {
  mail: PropTypes.any,
  physicalDeliveryOfficeName: PropTypes.any
};

export function ProfileInfo({ profile }) {
  const organization = formatUserOrganization(profile);

  return (
    <Segment attached>
      <Button.Group>
        <UserProfileCloseButtonContainer />
      </Button.Group>
      <Segment basic clearing>
        <Header as="h5" floated={"right"}>
          <ContactAddButtonContainer contact={profile} />
        </Header>

        <Header as="h3" floated={"left"}>
          <Icon name="user" color={"blue"} />
          <Header.Content>
            {profile.displayName}
            <Header.Subheader>{organization}</Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>

      <UserProfileExtraInfo
        mail={profile.mail}
        physicalDeliveryOfficeName={profile.physicalDeliveryOfficeName}
      />
    </Segment>
  );
}

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired
};

export class UserProfile extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired
  };

  render() {
    const { fetching, profile } = this.props;
    if (fetching) {
      return <Loader size={"large"} />;
    }

    return (
      <Segment basic className={"UserProfile"}>
        <ProfileInfo profile={profile} />
        {profile.phones.map((phone, index) => (
          <UserPhoneNumberContainer
            key={`number-${index}`}
            phoneNumber={phone.number}
            recipientName={profile.displayName}
            icon={phone.phoneType}
          />
        ))}
      </Segment>
    );
  }
}

export default UserProfile;
