import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

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
