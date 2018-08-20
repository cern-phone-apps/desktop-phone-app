import React, {Component} from 'react'
import {Button, Icon, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import './Caller.css'
import UserSearchContainer from 'calls/containers/components/UserSearch/UserSearchContainer'
import DialpadContainer from 'calls/containers/components/Dialpad/DialpadContainer'
import CalleeProfileContainer from 'calls/containers/components/CalleeProfile/CalleeProfileContainer'
import ErrorMessageContainer from 'common/containers/components/ErrorMessage/ErrorMessageContainer'

export class Caller extends Component {
  static propTypes = {
    userSelected: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    updateSearchValue: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    activeNumber: PropTypes.string,
    makeCall: PropTypes.func.isRequired,
    toggleDialpad: PropTypes.func.isRequired,
    displayDialpad: PropTypes.bool.isRequired
  }

  handleDialPadDisplayButton = () => {
    this.props.toggleDialpad(!this.props.displayDialpad)
  }

  render () {
    const {t} = this.props

    return (
      <div className="call-inner-content">
        <h2 className="ui center aligned header gray-text">{t('header')}</h2>
        <Segment basic className="ui center aligned Caller__ConnectedParagraph">
          <ErrorMessageContainer/>
          <p>You are connected with number <strong>{this.props.activeNumber}</strong></p>
        </Segment>
        <Segment attached={!this.props.userSelected} className={'search-user'}>
          <UserSearchContainer/>
        </Segment>
        {!this.props.userSelected &&
        <Button attached='bottom' onClick={this.handleDialPadDisplayButton}>
          <Icon name={'text telephone'}/> {t('dialpadText')}
        </Button>
        }
        {this.props.displayDialpad && <DialpadContainer/>}
        {this.props.userSelected && <CalleeProfileContainer/>}
      </div>
    )
  }
}

export default translate('calls')(Caller)
