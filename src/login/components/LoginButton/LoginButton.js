import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import buildUrl from 'build-url'
import {translate} from 'react-i18next'

/**
 * The idea of this component is to redirect the user to the Oauth authorization URL of your provider.
 */
class LoginButton extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    urlQuery: PropTypes.string.isRequired,
    getMe: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  /**
   * Builds the authorization url with the given parameters
   * @returns {*}
   */
  buildAuthorizeUrl = () => {
    const config = {
      client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
      url: process.env.REACT_APP_OAUTH_AUTHORIZATION_URL + process.env.REACT_APP_OAUTH_AUTHORIZATION_PATH,
      redirect_url: process.env.REACT_APP_OAUTH_REDIRECT_URL,
      response_type: 'code'
    }
    return buildUrl(config.url, {
      queryParams: {
        client_id: config.client_id,
        response_type: config.response_type,
        redirect_uri: config.redirect_url
      }
    })
  }

  /**
   * Redirects the user to the Oauth authorization URL
   */
  loginUser = () => {
    console.debug('Login user')
    window.location.href = this.buildAuthorizeUrl()
  }

  render () {
    const {t} = this.props
    return (
      <Button color={'blue'} onClick={this.loginUser}>{t('loginButtonText')}</Button>
    )
  }
}

export default translate('translations')(LoginButton)
