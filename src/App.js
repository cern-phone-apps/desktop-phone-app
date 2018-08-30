import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Route, Switch} from 'react-router-dom'
import Raven from 'raven-js'

import MainPageContainer from 'common/containers/screens/MainPage/MainPageContainer'
import RedirectPageContainer from 'login/containers/screens/RedirectPage/RedirectPageContainer'
import LoginPageContainer from 'login/containers/screens/LoginPage/LoginPageContainer'
import * as routes from 'routes'
import * as loginRoutes from 'login/routes'
import {infoMessage} from 'common/utils'

Raven
  .config(process.env.REACT_APP_SENTRY_DSN)
  .install()

const NoMatch = ({ location }) => (
  <div>
    <h3>
      404 - No match for <code>{location.pathname}</code>
    </h3>
  </div>
)

NoMatch.propTypes = {
  location: PropTypes.string
}

class App extends Component {
  render () {
    infoMessage('Application loaded')
    return (
      <Switch>
        <Route exact={true} path={routes.mainRoute.path} component={MainPageContainer}/>
        <Route path={loginRoutes.redirectRoute.path} component={RedirectPageContainer}/>
        <Route path={loginRoutes.loginRoute.path} component={LoginPageContainer}/>
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export default translate('translations')(App)
