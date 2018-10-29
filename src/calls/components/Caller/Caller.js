import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import "./Caller.css";
import UserSearchContainer from "calls/containers/components/UserSearch/UserSearchContainer";

/**
 * Caller Screen. On this screen is where the user makes calls and searches
 * for other users
 */
export class Caller extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired, // Translate
    displayDialpad: PropTypes.bool.isRequired,
    toggleDialpad: PropTypes.func.isRequired
  };

  handleDialPadDisplayButton = () => {
    const { toggleDialpad, displayDialpad } = this.props;
    toggleDialpad(!displayDialpad);
  };

  render() {
    const segmentStyles = {
      height: "100%"
    };
    return (
      <Segment basic style={segmentStyles}>
        <UserSearchContainer
          displayDialpadAction={this.handleDialPadDisplayButton}
        />
      </Segment>
    );
  }
}

export default translate("calls")(Caller);
