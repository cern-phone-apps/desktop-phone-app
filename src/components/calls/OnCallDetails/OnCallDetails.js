import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './OnCallDetails.css'
import Timer from 'simple-react-timer'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class OnCallDetails extends Component {
  static propTypes = {
    hangupCall: PropTypes.func.isRequired,
    startTime: PropTypes.number.isRequired
  }

  render () {
    return (

      <div className="call-inner-content">
        <div className="ui segment">
          <div>
            <h3 className="ui center aligned header">On call with</h3>
            <h2 className="ui center aligned header">
              <img src={'images/avatar/patrick.png'} alt={'avatar'}
                className="ui circular image"/> Patrick
            </h2>
            <div className="ui center aligned basic segment">
              <Timer startTime={this.props.startTime}/>
            </div>
            <div className="ui center aligned basic segment">
              <button onClick={() => this.props.hangupCall()}
                className="ui circular red icon button">
                <i className="phone icon"/>
              </button>
              <button className="ui circular icon button">
                <i className="mute icon"/>
              </button>
              <Button as={Link} to={'/chat'} circular icon={'comment'}/>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default OnCallDetails
