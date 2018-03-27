import React, {Component} from 'react'
import {translate} from 'react-i18next'
import {Route, Switch} from 'react-router-dom'

import MainPageContainer from 'containers/main/MainPage/MainPageContainer'
import {LoginPageContainer, RedirectPageContainer} from 'containers/login'

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
)

class App extends Component {
  render () {
    console.debug('App')

    return (
      <Switch>
        <Route path='/login' exact component={LoginPageContainer}/>
        <Route path='/redirect' component={RedirectPageContainer}/>
        <Route path='/' exact component={MainPageContainer}/>
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export default translate('translations')(App)
