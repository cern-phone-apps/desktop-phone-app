import React, {Component} from "react";
import {Header, Icon, Loader, Segment} from "semantic-ui-react";
import PropTypes from "prop-types";
import UserPhoneNumberContainer from "calls/components/UserProfile/UserPhoneNumberContainer";

export function ProfileInfo({ profile }) {
  const division = profile.division === "[]" ? "" : profile.division;
  const group = profile.cernGroup === "[]" ? "" : `-${profile.cernGroup}`;
  const section = profile.cernSection === "[]" ? "" : `-${profile.cernSection}`;
  return (
    <Segment attached>
      <Header as="h3">
        <Icon name="user" color={"blue"} />
        <Header.Content>
          {profile.displayName}
          <Header.Subheader>
            {division}
            {group}
            {section}
          </Header.Subheader>
        </Header.Content>
      </Header>

      <ul>
        <li>
          <Icon name={"mail"} /> {profile.mail}
        </li>
        <li>
          <Icon name={"pin"} /> {profile.physicalDeliveryOfficeName}
        </li>
      </ul>
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

  getItems = () => {
    const { profile } = this.props;
    if (!profile || !profile.phones) {
      return [];
    }
    return profile.phones.map((phone, index) => (
      <UserPhoneNumberContainer
        key={`number-${index}`}
        phoneNumber={phone.number}
        recipientName={profile.displayName}
        icon={phone.phoneType}
      />
    ));
  };

  render() {
    const { fetching, profile } = this.props;
    if (fetching) {
      return <Loader size={"large"} />;
    }

    return (
      <Segment basic>
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
