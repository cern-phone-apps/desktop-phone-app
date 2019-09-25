import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import buildUrl from 'build-url';
import { translate } from 'react-i18next';
import { actionMessage } from 'common/utils/logs';
/**
 * The idea of this component is to redirect the user to the Oauth authorization URL of your provider.
 */
export class LoginButton extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    window: PropTypes.shape({
      href: PropTypes.string
    })
  };

  static defaultProps = {
    window
  };

  /**
   * Builds the authorization url with the given parameters
   * @returns {*}
   */
  buildAuthorizeUrl = () => {
    const config = {
      client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
      url: process.env.REACT_APP_OAUTH_AUTHORIZATION_URL,
      redirect_url: process.env.REACT_APP_OAUTH_REDIRECT_URL,
      response_type: 'code'
    };
    return buildUrl(config.url, {
      queryParams: {
        client_id: config.client_id,
        response_type: config.response_type,
        redirect_uri: config.redirect_url
      }
    });
  };

  /**
   * Redirects the user to the Oauth authorization URL
   */
  loginUser = () => {
    actionMessage(`Auth: User clicks login button`);
    const authorizeUrl = this.buildAuthorizeUrl();
    const { window: propsWindow } = this.props;
    let win;
    if (!propsWindow) {
      win = window;
    } else {
      win = propsWindow;
    }
    win.location.href = authorizeUrl;
  };

  render() {
    const { t } = this.props;
    return (
      <Button className="LoginButton" color="blue" onClick={this.loginUser} tabIndex="0">
        {t('loginButtonText')}
      </Button>
    );
  }
}

export default translate('translations')(LoginButton);
