import React, { Component } from "react";
import { translate } from "react-i18next";
import { NavLink, Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import "./MainPage.css";
import * as routes from "routes";
import * as loginRoutes from "login/routes";
import Notifications from "common/components/Notifications/Notifications";
import ModalDebugContainer from "debug/components/ModalDebug/ModalDebugContainer";
import SettingsModalContainer from "settings/components/SettingsModal/SettingsModalContainer";

export class MainPage extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
    contentDimmed: PropTypes.bool.isRequired,
    notifications: PropTypes.array,
    hideSidebar: PropTypes.func.isRequired,
  };

  hideSidebarIfVisible = () => {
    return this.props.isVisible ? this.props.hideSidebar() : "";
  };

  /**
   * Renders all the sidebar items
   * @returns {*}
   */
  renderSidebarItems = () => {
    const { t } = this.props;
    return routes.mainRoutes(t).map((route, index) => (
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
    ));
  };

  /**
   * Renders the main content routes
   * @returns {*}
   */
  renderMainRoutes = () => {
    const { t } = this.props;
    return routes.mainRoutes(t).map((route, index) => (
      /**
       * You can render a <Route> in as many places
       * as you want in your app. It will render along
       * with any other <Route>s that also match the URL.
       * So, a sidebar or breadcrumbs or anything else
       * that requires you to render multiple things
       * in multiple places at the same URL is nothing
       * more than multiple <Route>s.
       */
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.main}
      />
    ));
  };

  render() {
    const { notifications } = this.props;

    if (!this.props.isAuthenticated) {
      return <Redirect to={loginRoutes.loginRoute.path} />;
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
          <SettingsModalContainer
            hideSidebarIfVisible={this.hideSidebarIfVisible}
          />
          <ModalDebugContainer
            hideSidebarIfVisible={this.hideSidebarIfVisible}
          />
        </Sidebar>
        <Sidebar.Pusher
          onClick={this.hideSidebarIfVisible}
          dimmed={this.props.contentDimmed}
          className={"MainPusher"}
        >
          {this.renderMainRoutes()}
          <Notifications notifications={notifications} />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default translate("translations")(MainPage);
