import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Header, Segment, Button } from 'semantic-ui-react';

import { translate } from 'react-i18next';
import './LoginPage.css';
import * as routes from 'calls/routes';
import LoadingDimmer from 'auth/components/LoadingDimmer/LoadingDimmer';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';
import ErrorMessageContainer from 'common/components/ErrorMessage/ErrorMessageContainer';
import ElectronService from 'services/electron-service';

export class LoginPage extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loginInProgress: PropTypes.bool
  };

  state = {
    code: undefined
  };

  componentDidMount = async () => {
    document.body.className = 'loginStyle';
    const { login, getMe } = this.props;

    const code = ElectronService.getOauthCode();
    console.log(`code is: ${code}`);

    if (code) {
      this.setState({ code });
      login(code)
        .then(result => {
          if (result.error) {
            console.error(
              `Unable to authenticate with the given code: ${code}`
            );
            ElectronService.setUserAsUnauthenticated();
          }

          console.log(result);
          if (result !== undefined && !result.error) {
            const {
              access_token: accessToken,
              refresh_token: refreshToken
            } = result.payload;
            const response = ElectronService.setUserAsAuthenticated(
              accessToken,
              refreshToken
            );
            response.then(response2 => {
              this.props.setAuthenticated();
              getMe();
            });
          }
        })
        .catch(error => {
          console.error(error);
          ElectronService.setUserAsUnauthenticated();
        });
    } else {
      ElectronService.setUserAsUnauthenticated();
    }
  };

  render() {
    const { isAuthenticated, loginInProgress } = this.props;
    if (isAuthenticated) {
      return <Redirect exact to={routes.callsRoute.path} />;
    }

    if (loginInProgress) {
      return <LoadingDimmer />;
    }

    return (
      <div className="LoginPage">
        <div className="padded-item LoginPage__Centered">
          <div className="centered-element">
            <h2 className="ui center aligned header gray-text">
              <img src="/images/cern/outline_80_white.png" alt="cern logo" />
            </h2>
            <ErrorBoundary>
              <ErrorMessageContainer />
              <Segment inverted color="grey" attached="top" textAlign="center">
                <Header as="h2">CERN Phone App</Header>
              </Segment>
              <Segment textAlign="center" raised attached>
                <h4>Login with your CERN account</h4>
                <Button
                  onClick={() => ElectronService.setUserAsUnauthenticated()}
                >
                  Logout
                </Button>
              </Segment>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    );
  }
}

export default translate('translations')(LoginPage);
