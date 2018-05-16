import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Route, Switch} from 'react-router-dom'

import MainPageContainer from 'containers/pages/MainPage/MainPageContainer'
import {LoginPageContainer, RedirectPageContainer} from 'containers/components/login'
import * as routes from 'routes'

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
)

NoMatch.propTypes = {
  location: PropTypes.string
}

class App extends Component {
  render () {
    return (
      <Switch>
        <Route path={routes.loginRoute.path} component={LoginPageContainer}/>
        <Route path={routes.redirectRoute.path} component={RedirectPageContainer}/>
        <Route path='/' component={MainPageContainer}/>
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export default translate('translations')(App)
