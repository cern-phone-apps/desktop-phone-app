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
    if (process.USE_DUMMY_API === 'true') {
      PhoneProvider.loadDummyDialApi().then((dialParam) => {
        dial = dialParam(this.handleUAEvents, this.handleSessionEvents)
      })
    } else {
      PhoneProvider.loadDialApi().then((dialParam) => {
        dial = dialParam(this.handleUAEvents, this.handleSessionEvents)
      })
    }

    this.setState({
      dial: dial
    })
  }

  static async loadDialApi (location) {
    const {initDial} = await import('external/tone-webrtc-api/src/api/dial-api')
    return initDial
  }

  static async loadDummyDialApi (location) {
    const {initDial} = await import('./DummyAPIClient')
    return initDial
  }

  connectAgent = (username, password) => {
    console.debug('connect agent')
    this.props.requestConnection()
    return this.state.dial.startAgent('88001', '88001')
  }

  handleUAEvents = (event, data) => {
    console.debug('ua', event, data)
    switch (event.name) {
      case 'disconnected':
        const errors = {message: 'It seems there is a disconnection. More attempts of connection will be made'}
        this.props.setConnectionFailure(errors)
        console.error(errors.message)
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
