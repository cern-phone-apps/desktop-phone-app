import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import qs from "qs";

import { callsRoute } from "calls/routes";
import LoadingDimmer from "auth/components/LoadingDimmer/LoadingDimmer";
import * as loginRoutes from "auth/routes";
import { errorMessage, infoMessage, logMessage } from "common/utils/logs";

class RedirectPage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loginInProgress: PropTypes.bool,
    urlQuery: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    const { login, getMe } = this.props;
    const queryParams = qs.parse(this.props.urlQuery.slice(1));

    if (queryParams.code) {
      infoMessage("Login user with code...");
      login(queryParams.code).then(result => {
        logMessage(result);
        if (result !== undefined && !result.error) {
          infoMessage("User logged in successfully. Getting. profile...");
          getMe();
        }
      }).catch((error) => {
        errorMessage(error);
      });
    }
  };

  render() {
    const { isAuthenticated } = this.props;
    if (this.props.loginInProgress) {
      return <LoadingDimmer />;
    }

    if (isAuthenticated) {
      return <Redirect exact={true} to={callsRoute.path} />;
    } else {
      return <Redirect exact={true} to={loginRoutes.loginRoute.path} />;
    }
  }
}

export default RedirectPage;
