import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {Segment} from 'semantic-ui-react'

import {translate} from 'react-i18next'
import {LoadingDimmer} from 'components/login'
import {LoginButtonContainer} from 'containers/login'

class LoginPage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loginInProgress: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  }

  render () {
    const {t} = this.props

    if (this.props.isAuthenticated) {
      return <Redirect to='/'/>
    }

    if (this.props.loginInProgress) {
      return <LoadingDimmer/>
    }

    return (
      <div className={'login-container'}>
        <div className={`padded-item call-content-centered caller-with-bg`}>
          <div className="Aligner-item--fixed">
            <div className="call-inner-content">
              <h2 className="ui center aligned header gray-text">{t('loginPageHeader')}</h2>
              <Segment textAlign={'center'}>
                <LoginButtonContainer/>
              </Segment>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default translate('translations')(LoginPage)
