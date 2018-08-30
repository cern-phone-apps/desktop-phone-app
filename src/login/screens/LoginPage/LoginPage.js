import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {Segment} from 'semantic-ui-react'

import {translate} from 'react-i18next'
import './LoginPage.css'
import * as routes from 'calls/routes'
import LoadingDimmer from 'login/components/LoadingDimmer/LoadingDimmer'
import LoginButton from 'login/components/LoginButton/LoginButton'
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary'

export class LoginPage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loginInProgress: PropTypes.bool,
    t: PropTypes.func.isRequired
  }

  render () {
    const {t} = this.props

    if (this.props.isAuthenticated) {
      return <Redirect exact={true} to={routes.callsRoute.path}/>
    }

    if (this.props.loginInProgress) {
      return <LoadingDimmer/>
    }

    return (
      <div className={'LoginPage'}>
        <div className={'padded-item LoginPage__Centered'}>
          <div className="centered-element">
            <h2 className="ui center aligned header gray-text">{t('loginPageHeader')}</h2>
            <ErrorBoundary>
              <Segment textAlign={'center'}>
                <LoginButton/>
              </Segment>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    )
  }
}

export default translate('translations')(LoginPage)
