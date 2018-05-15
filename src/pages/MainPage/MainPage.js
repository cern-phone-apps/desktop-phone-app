import React, {Component} from 'react'
import {translate} from 'react-i18next'
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Icon, Menu, Segment, Sidebar} from 'semantic-ui-react'

import './MainPage.scss'
import * as routes from 'routes'
import {ModalSettingsContainer} from 'containers/components/settings'

class MainPage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    contentDimmed: PropTypes.bool.isRequired,
    hideSidebar: PropTypes.func.isRequired
  }

  hideSidebarIfVisible = () => {
    return this.props.isVisible ? this.props.hideSidebar() : ''
  }

  renderSidebarItems = () => {
    const {t} = this.props
    return (
      routes.mainRoutes(t).map((route, index) => (
        // You can render a <Route> in as many places
        // as you want in your app. It will render along
        // with any other <Route>s that also match the URL.
        // So, a sidebar or breadcrumbs or anything else
        // that requires you to render multiple things
        // in multiple places at the same URL is nothing
        // more than multiple <Route>s.
        <Menu.Item
          onClick={this.hideSidebarIfVisible}
          name={route.sidebarId}
          as={NavLink}
          key={index} to={route.path}
          exact={route.exact}>
          <Icon name={route.sidebarIcon}/>
          {route.sidebarText}
        </Menu.Item>
      ))
    )
  }

  renderMainRoutes = () => {
    const {t} = this.props
    return (
      routes.mainRoutes(t).map((route, index) => (
        // You can render a <Route> in as many places
        // as you want in your app. It will render along
        // with any other <Route>s that also match the URL.
        // So, a sidebar or breadcrumbs or anything else
        // that requires you to render multiple things
        // in multiple places at the same URL is nothing
        // more than multiple <Route>s.
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ))
    )
  }

  render () {
    if (!this.props.isAuthenticated) {
      console.debug('Redirecting to login', routes.loginRoute.path)
      return <Redirect to={routes.loginRoute.path}/>
    }

    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          width='thin'
          visible={this.props.isVisible}
          icon='labeled' vertical>
          {this.renderSidebarItems()}
          <ModalSettingsContainer hideSidebarIfVisible={this.hideSidebarIfVisible}/>
        </Sidebar>
        <Sidebar.Pusher onClick={this.hideSidebarIfVisible} dimmed={this.props.contentDimmed}>
          <Switch>
            {this.renderMainRoutes()}
          </Switch>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

export default translate('translations')(MainPage)
