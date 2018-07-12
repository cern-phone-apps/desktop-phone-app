import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Route, Switch} from 'react-router-dom'

import MainPageContainer from 'common/containers/screens/MainPage/MainPageContainer'
import {LoginPageContainer, RedirectPageContainer} from 'login/containers/components'
import * as routes from 'routes'

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
    return (
      <Switch>
        <Route exact={true} path={routes.mainRoute.path} component={MainPageContainer}/>
        <Route path={routes.redirectRoute.path} component={RedirectPageContainer}/>
        <Route path={routes.loginRoute.path} component={LoginPageContainer}/>
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export default translate('translations')(App)
