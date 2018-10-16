import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {logEvent} from 'common/utils'

/**
 * Will trigger the user's logout
 */
export class LogoutButton extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    color: PropTypes.string
  }
  /**
   * Fires the logout action
   */
  logoutUser = () => {
    logEvent('trackEvent', 'auth',`logout`)
    this.props.logout()
  }

  render () {
    const {t, color} = this.props
    return (
      <Button className={'LogoutButton'} color={color} onClick={this.logoutUser}>{t('logoutButtonText')}</Button>
    )
  }
}

export default translate('translations')(LogoutButton)
