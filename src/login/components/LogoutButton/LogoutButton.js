import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

/**
 * Will trigger the user's logout
 */
export class LogoutButton extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }
  /**
   * Fires the logout action
   */
  logoutUser = () => {
    this.props.logout()
  }

  render () {
    const {t} = this.props
    return (
      <Button className={'LogoutButton'} color={'blue'} onClick={this.logoutUser}>{t('logoutButtonText')}</Button>
    )
  }
}

export default translate('translations')(LogoutButton)
