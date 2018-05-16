import React, {Children, Component} from 'react'
import * as connectionActionCreators from 'actions/calls/connection'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// import {initDial} from 'external/tone-webrtc-api/src/api/dial-api'
import {bindActionCreators} from 'redux'

export const phoneService = (ComponentToWrap) => {
  return class ThemeComponent extends Component {
    // let’s define what’s needed from the `context`
    static contextTypes = {
      phoneService: PropTypes.object
    }

    render () {
      const {phoneService} = this.context
      // what we do is basically rendering `ComponentToWrap`
      // with an added `theme` prop, like a hook
      return (
        <ComponentToWrap {...this.props} phoneService={phoneService}/>
      )
    }
  }
}

class PhoneProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    requestConnection: PropTypes.func,
    setConnectionFailure: PropTypes.func
  }

  state = {
    phoneService: this
  }

  componentDidMount () {
    let dial = null
    PhoneProvider.loadDialApi().then((dialParam) => {
      dial = dialParam(this.handleUAEvents, this.handleSessionEvents)
      console.debug(dial)

      this.setState({
        dial: dial
      })
    })
  }

  static async loadDialApi () {
    console.debug(process.env.REACT_APP_TONE_API_PATH)
    const {initDial} = await import(process.env.REACT_APP_TONE_API_PATH)
    console.debug(initDial)
    return initDial
  }

  connectAgent = (username, password, withDisconnect = false) => {
    console.debug('connect agent')
    this.props.requestConnection()
    return this.state.dial.startAgent('88001', '88001', withDisconnect)
  }

  handleUAEvents = (event, data) => {
    console.debug('ua', event, data)
    switch (event.name) {
      case 'disconnected':
        const errors = {message: 'It seems there is a disconnection. More attempts of connection will be made'}
        this.props.setConnectionFailure(errors)
        console.error(errors.message)
        break
      case 'connected':

        // this.props.setConnectionFailure(errors)
        break
      default:
        console.log(`Event received but not handled: ${event.name}`)
    }
  }

  handleSessionEvents = (event, data) => {
    console.debug('session', event, data)
  }

  getChildContext () {
    return {phoneService: this.state.phoneService}
  }

  render () {
    console.debug(this.state.phoneService)
    const {children} = this.props
    return Children.only(children)
  }
}

PhoneProvider.childContextTypes = {
  phoneService: PropTypes.object.isRequired
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...connectionActionCreators
  }, dispatch)
}

export default phoneService(connect(
  null,
  mapDispatchToProps
)(PhoneProvider))
