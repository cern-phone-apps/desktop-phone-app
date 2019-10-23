import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function UserProfileExtraInfo({
  mail,
  physicalDeliveryOfficeName,
  username
}) {
  return (
    <ul>
      <li>
        <Icon name="mail" /> {mail}
      </li>
      <li>
        <Icon name="pin" /> {physicalDeliveryOfficeName}
      </li>
      <li>
        <Icon name="chat" /> {'Chat with ' + username}
      </li>
    </ul>
  );
}

UserProfileExtraInfo.propTypes = {
  mail: PropTypes.string.isRequired,
  physicalDeliveryOfficeName: PropTypes.string.isRequired
};
