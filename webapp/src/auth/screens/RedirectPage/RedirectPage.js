import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

import { callsRoute } from 'calls/routes';
import TranslatedLoadingDimmer from 'auth/components/LoadingDimmer/LoadingDimmer';
import * as loginRoutes from 'auth/routes';
import { errorMessage, infoMessage, logMessage } from 'common/utils/logs';

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
    const { login, getMe, urlQuery } = this.props;
    const queryParams = qs.parse(urlQuery.slice(1));

    if (queryParams.code) {
      infoMessage('Login user with code...');
      login(queryParams.code)
        .then(result => {
          logMessage(result);
          if (result !== undefined && !result.error) {
            infoMessage('User logged in successfully. Getting. profile...');
            getMe();
          }
        })
        .catch(error => {
          errorMessage(error);
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
