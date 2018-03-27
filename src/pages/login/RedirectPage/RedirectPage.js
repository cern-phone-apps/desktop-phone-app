import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'

import './RedirectPage.css'

class RedirectPage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    urlQuery: PropTypes.string.isRequired,
    getMe: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    console.debug('Component will mount')
    const queryParams = queryString.parse(this.props.urlQuery)
    if (queryParams.code) {
      console.debug('code is in params', queryParams.code)
      this.props.login(queryParams.code).then(() => {
        this.props.getMe()
      })
    }
  }

  render () {
    if (this.props.isAuthenticated) {
      return <Redirect to='/'/>
    } else {
      return <Redirect to='/login'/>
    }
  }
}

export default RedirectPage
