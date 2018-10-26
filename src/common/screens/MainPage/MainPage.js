import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { NavLink, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

import './MainPage.css'
import * as routes from 'routes'
import ModalSettingsContainer from 'settings/containers/components/ModalSettings/ModalSettingsContainer'
import * as loginRoutes from 'login/routes'
import Notifications from 'common/components/Notifications/Notifications'
import ModalDebugContainer from 'debug/components/ModalDebug/ModalDebugContainer'

export class MainPage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    contentDimmed: PropTypes.bool.isRequired,
    hideSidebar: PropTypes.func.isRequired,
    notifications: PropTypes.array
  }

  hideSidebarIfVisible = () => {
    return this.props.isVisible ? this.props.hideSidebar() : ''
  }

  renderSidebarItems = () => {
    const { t } = this.props
    return routes.mainRoutes(t).map((route, index) => (
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
        key={index}
        to={route.path}
        exact={route.exact}
      >
        <Icon name={route.sidebarIcon} />
        {route.sidebarText}
      </Menu.Item>
    ))
  }

  renderMainRoutes = () => {
    const { t } = this.props
    return routes.mainRoutes(t).map((route, index) => (
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
  }

  render () {
    const { notifications } = this.props

    if (!this.props.isAuthenticated) {
      return <Redirect to={loginRoutes.loginRoute.path} />
    }

    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          visible={this.props.isVisible}
          icon="labeled"
          vertical
        >
          {this.renderSidebarItems()}
          <ModalSettingsContainer
            hideSidebarIfVisible={this.hideSidebarIfVisible}
          />
          <ModalDebugContainer
            hideSidebarIfVisible={this.hideSidebarIfVisible}
          />
        </Sidebar>
        <Sidebar.Pusher
          onClick={this.hideSidebarIfVisible}
          dimmed={this.props.contentDimmed}
          className={'MainPusher'}
        >
          {this.renderMainRoutes()}
          <Notifications notifications={notifications} />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

export default translate('translations')(MainPage)
