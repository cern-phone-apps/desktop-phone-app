import React, {Component} from 'react'
import {translate} from 'react-i18next'
import PropTypes from 'prop-types'

import './NotSelectedPage.css'
import {RightColumn} from 'components/common'

class NotSelectedPage extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  }

  render () {
    const {t} = this.props
    return (
      <RightColumn>
        <div className={'padded-item NotSelectedPage__Centered'}>
          <div className="centered-element">
            <h2 className="ui center aligned header gray-text">{t('noChatSelectedText')}</h2>
          </div>
        </div>
      </RightColumn>
    )
  }
}

export default translate('chat')(NotSelectedPage)
