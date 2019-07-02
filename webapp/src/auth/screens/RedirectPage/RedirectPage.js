import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { callsRoute } from 'calls/routes';
import TranslatedLoadingDimmer from 'auth/components/LoadingDimmer/LoadingDimmer';
import * as loginRoutes from 'auth/routes';
import { errorMessage, infoMessage, logMessage } from 'common/utils/logs';

const electron = window.require('electron');
const { ipcRenderer } = electron;

class RedirectPage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loginInProgress: PropTypes.bool,
    urlQuery: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired
  };

  static defaultProps = {
    loginInProgress: false
  };

  componentDidMount = () => {
    const { login, getMe } = this.props;
    const { code } = this.props.location.state;
    // const queryParams = qs.parse(urlQuery.slice(1));

    if (code) {
      infoMessage('Login user with code...');
      login(code)
        .then(result => {
          if (result.error) {
            console.error(
              `Unable to authenticate with the given code: ${code}`
            );
            ipcRenderer.sendSync('synchronous-message', 'user-unauthenticated');
          }

          logMessage(result);
          if (result !== undefined && !result.error) {
            infoMessage('User logged in successfully. Getting. profile...');
            getMe();
            ipcRenderer.sendSync('synchronous-message', 'user-authenticated');
          }
        })
        .catch(error => {
          errorMessage(error);
          ipcRenderer.sendSync('synchronous-message', 'user-unauthenticated');
        });
    }
  };

  render() {
    const { loginInProgress, isAuthenticated } = this.props;
    if (loginInProgress) {
      return <TranslatedLoadingDimmer />;
    }

    if (isAuthenticated) {
      return <Redirect exact to={callsRoute.path} />;
    }
    return <Redirect exact to={loginRoutes.loginRoute.path} />;
  }
}

export default RedirectPage;
