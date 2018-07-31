import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import buildUrl from 'build-url'
import {translate} from 'react-i18next'

/**
 * The idea of this component is to redirect the user to the Oauth authorization URL of your provider.
 */
export class LoginButton extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    urlQuery: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  }

  state = {
    redirected: false,
    authorizeUrl: undefined
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
    const authorizeUrl = this.buildAuthorizeUrl()
    this.setState({
      redirected: true,
      authorizeUrl: authorizeUrl
    })
    window.location.href = authorizeUrl
  }

  render () {
    const {t} = this.props
    return (
      <Button className={'LoginButton'} color={'blue'} onClick={this.loginUser}>{t('loginButtonText')}</Button>
    )
  }
}

export default translate('translations')(LoginButton)
