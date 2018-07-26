import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import qs from 'qs'

import * as routes from 'routes'
import {LoadingDimmer} from 'login/components/index'
import {callsRoute} from 'calls/routes'

class RedirectPage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    urlQuery: PropTypes.string.isRequired,
    getMe: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    console.debug('Component did mount')
    const queryParams = qs.parse(this.props.urlQuery.slice(1))
    if (queryParams.code) {
      console.debug('code is in params', queryParams.code)
      this.props.login(queryParams.code).then(() => {
        this.props.getMe()
      })
    }
  }

  render () {
    console.debug('Render redirect page')

    if (this.props.loginInProgress) {
      return <LoadingDimmer/>
    }

    if (this.props.isAuthenticated) {
      return <Redirect exact={true} to={callsRoute.path}/>
    } else {
      return <Redirect exact={true} to={routes.loginRoute.path}/>
    }
  }
}

export default RedirectPage
