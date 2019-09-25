import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { actionMessage } from 'common/utils/logs';
/**
 * Will trigger the user's logout
 */
export class LogoutButton extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    color: PropTypes.string,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    color: 'red'
  };

  /**
   * Fires the logout action
   */
  logoutUser = () => {
    const { logout } = this.props;
    actionMessage(`Auth: User clicks logout button`);
    logout();

    // ipcRenderer.sendSync('synchronous-message', 'user-unauthenticated');
  };

  render() {
    const { t, color } = this.props;
    return (
      <Button className="LogoutButton" role="button" tabIndex="0" color={color} onClick={this.logoutUser}>
        {t('logoutButtonText')}
      </Button>
    );
  }
}

export default translate('translations')(LogoutButton);
