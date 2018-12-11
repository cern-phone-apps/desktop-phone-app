import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import qs from "qs";

import { callsRoute } from "calls/routes";
import LoadingDimmer from "login/components/LoadingDimmer/LoadingDimmer";
import * as loginRoutes from "login/routes";
import { logMessage } from "common/utils";

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
    const isOauthEnabled = process.env.REACT_APP_OAUTH_ENABLED;
    const queryParams = qs.parse(this.props.urlQuery.slice(1));

    if (queryParams.code || isOauthEnabled === "false") {
      login(queryParams.code).then((result) => {
        logMessage(`Result is here`);
        logMessage(result);
        if(result !== undefined && !result.error){
          getMe();
        }
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
