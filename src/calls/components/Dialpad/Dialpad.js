import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Grid, Icon, Segment} from 'semantic-ui-react'

import './Dialpad.css'
import {logMessage} from 'common/utils'

/**
 * Represents a button on the Dialpad
 * @param props
 * @returns {*}
 * @constructor
 */
export class DialButton extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
    longPressHandler: PropTypes.func.isRequired,
    symbol: PropTypes.string.isRequired,
    alt: PropTypes.string,
    longPressTimeout: PropTypes.number.isRequired
  }

  static defaultProps = {
    longPressTimeout: 300
  }

  state = {
    startTime: null
  }

  handleDialPadButtonDown = () => {
    this.setState({
      startTime: new Date()
    })
  }

  isLongPress = () => {
    return new Date() - this.state.startTime > this.props.longPressTimeout
  }

  handleDialPadButtonLongPressRelease () {
    if (!this.isLongPress() || !this.props.alt) {
      this.props.clickHandler(this.props.symbol)
    } else {
      this.props.longPressHandler(this.props.alt)
    }
    this.setState({
      startTime: null
    })
  }

  render () {
    return <Grid.Column textAlign={'center'}>
      <div className={'DialButton DialButton__number'}
        onMouseDown={() => this.handleDialPadButtonDown()}
        onMouseUp={() => this.handleDialPadButtonLongPressRelease()}
      >
        <div className={'DialButton__content'}>
          {this.props.symbol} {this.props.alt ? <span className={'DialButton__alt'}>+</span> : ''}
        </div>
      </div>
    </Grid.Column>
  }
}

/**
 * Represents the Call Button on the DialPad
 * @param props
 * @returns {*}
 * @constructor
 */
export function CallButton ({clickHandler, text}) {
  return (
    <div className={'DialButton CallButton'} onClick={() => clickHandler()}>
      <div className={'DialButton__content'}>
        {text}
      </div>
    </div>)
}

CallButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired
}

/**
 * Represents the phone Dialpad
 */
export default class Dialpad extends Component {
  static propTypes = {
    updateDialpadValue: PropTypes.func.isRequired,
    dialpadValue: PropTypes.string.isRequired,
  }

  buttonsRow1 = [{symbol: '1'}, {symbol: '2'}, {symbol: '3'}]
  buttonsRow2 = [{symbol: '4'}, {symbol: '5'}, {symbol: '6'}]
  buttonsRow3 = [{symbol: '7'}, {symbol: '8'}, {symbol: '9'}]
  buttonsRow4 = [{symbol: '*'}, {symbol: '0', alt: '+'}, {symbol: '#'}]

  rows = [this.buttonsRow1, this.buttonsRow2, this.buttonsRow3, this.buttonsRow4]

  handleDialPadButtonClick = (value) => {
    logMessage('handleDialPadButtonClick: ', value)
    logMessage('handleDialPadButtonClick: ', this.props.dialpadValue)
    this.props.updateDialpadValue(this.props.dialpadValue + value)
  }

  render () {

    return (
      <Segment attached='bottom' className={'Dialpad'}>
        <Grid columns={3} centered className={'Dialpad__grid'}>

          {this.rows.map((row, index) => {
            return <Grid.Row key={`row${index}`}>
              {row.map((button, index) => {
                return <DialButton
                  key={`button${index}`}
                  clickHandler={() => this.handleDialPadButtonClick(button.symbol)}
                  longPressHandler={() => this.handleDialPadButtonClick(button.alt)}
                  symbol={button.symbol}
                  alt={button.alt}/>
              })}
            </Grid.Row>
          })}

        </Grid>
      </Segment>
    )
  }
}



export class CallerDialpad extends Dialpad {
  static propTypes = {
    makeCall: PropTypes.func.isRequired
  }

  makeCall = () => {
    this.props.makeCall({
      name: 'Unknown',
      phoneNumber: this.props.dialpadValue,
      startTime: Date.now()
    })
  }

  render () {

    return (
      <Segment attached='bottom' className={'Dialpad'}>
        <Grid columns={3} centered className={'Dialpad__grid'}>

          {this.rows.map((row, index) => {
            return <Grid.Row key={`row${index}`}>
              {row.map((button, index) => {
                return <DialButton
                  key={`button${index}`}
                  clickHandler={() => this.handleDialPadButtonClick(button.symbol)}
                  longPressHandler={() => this.handleDialPadButtonClick(button.alt)}
                  symbol={button.symbol}
                  alt={button.alt}/>
              })}
            </Grid.Row>
          })}

          <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column textAlign={'center'}>
              <CallButton clickHandler={this.makeCall} text={<Icon name={'phone'}/>}/>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Segment>
    )
  }

}