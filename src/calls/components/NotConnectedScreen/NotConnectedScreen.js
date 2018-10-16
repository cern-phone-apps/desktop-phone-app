import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Segment} from 'semantic-ui-react'
import ConnectNumberButtonContainer from 'calls/containers/components/ConnectNumberButton/ConnectNumberButtonContainer'
export class NotConnectedScreen extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className="call-inner-content">
        <Segment textAlign={'center'} basic>
          <p>Select one of your phone numbers bellow to connect to TONE.</p>
          <ConnectNumberButtonContainer/>
        </Segment>
      </div>
    )
  }
}

export default translate('calls')(NotConnectedScreen)
