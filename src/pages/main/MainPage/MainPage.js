import React, {Component} from 'react'
import './MainPage.scss'
import {translate} from 'react-i18next'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {LogoutButtonContainer} from 'containers/login'

class MainPage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  }

  render () {
    const {t} = this.props

    console.debug('iAuthenticated?', this.props.isAuthenticated)

    if (!this.props.isAuthenticated) {
      return <Redirect to='/login'/>
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{t('welcome')}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <LogoutButtonContainer/>
        </p>
      </div>
    )
  }
}

export default translate('translations')(MainPage)
