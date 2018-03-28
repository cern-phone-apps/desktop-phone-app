import React, {Component} from 'react'
import {translate} from 'react-i18next'
import PropTypes from 'prop-types'

import {RightColumn} from 'components/common'

class NotSelectedPage extends Component {
  propTypes = {
    t: PropTypes.func.isRequired
  }

  render () {
    const {t} = this.props
    return (
      <RightColumn>
        <div className={`padded-item call-content-centered caller-with-bg`}>
          <div className="Aligner-item--fixed">
            <div className="call-inner-content">
              <h2 className="ui center aligned header gray-text">{t('noChatSelectedText')}</h2>
            </div>
          </div>
        </div>
      </RightColumn>
    )
  }
}

export default translate('chat')(NotSelectedPage)
