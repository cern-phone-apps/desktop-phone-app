import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { logMessage } from 'common/utils/logs';

export class DisconnectAndLogoutButton extends Component {
  static propTypes = {
    phoneService: PropTypes.shape({
      unAuthenticateUser: PropTypes.func.isRequired
    }).isRequired,
    disconnecting: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  };

  disconnect = () => {
    const { phoneService, logout } = this.props;
    phoneService.unAuthenticateUser();
    logout();
  };

  render() {
    const { disconnecting, connected } = this.props;

    logMessage(`Disconnecting is ${disconnecting}`);

    return (
      <div>
        <Button
          disabled={!connected}
          onClick={this.disconnect}
          title="Disconnect and logout"
        >
          <Icon name="plug" color="red" /> Disconnect and logout
        </Button>
      </div>
    );
  }
}

export default DisconnectAndLogoutButton;
