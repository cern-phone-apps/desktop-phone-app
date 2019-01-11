import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { actionMessage, logEvent } from "common/utils/logs";

/**
 * Will trigger the user's logout
 */
export class LogoutButton extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    color: PropTypes.string,
    logout: PropTypes.func.isRequired
  };
  /**
   * Fires the logout action
   */
  logoutUser = () => {
    const {logout} = this.props;
    logEvent("trackEvent", "auth", `logout`);
    actionMessage(`Auth: User clicks logout button`);
    logout();
  };

  render() {
    const { t, color } = this.props;
    return (
      <Button
        className={"LogoutButton"}
        color={color}
        onClick={this.logoutUser}
      >
        {t("logoutButtonText")}
      </Button>
    );
  }
}

export default translate("translations")(LogoutButton);
