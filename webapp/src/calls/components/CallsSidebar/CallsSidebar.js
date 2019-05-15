import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Icon, Menu, Responsive } from "semantic-ui-react";
import RecentCallListContainer from "calls/components/recent_calls/RecentCallList";
import LeftColumn from "common/components/LeftColumn/LeftColumn";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import LeftColumnHeader from "common/components/LeftColumnHeader/LeftColumnHeader";
import ContactListContainer from "calls/components/contacts/ContactsList/ContactListContainer";

function CallsSidebarMenu(props) {
  return (
    <Menu icon size="massive" fluid widths={3}>
      <Menu.Item
        name="phone"
        active={props.activeItem === "phone"}
        onClick={props.onClick}
      >
        <Icon name="phone" />
      </Menu.Item>

      <Menu.Item
        name="user"
        active={props.activeItem === "user"}
        onClick={props.onClick}
      >
        <Icon name="user" />
      </Menu.Item>

      <Menu.Item name="settings" onClick={props.onClick1}>
        <Icon name="settings" />
      </Menu.Item>
    </Menu>
  );
}

CallsSidebarMenu.propTypes = {
  activeItem: PropTypes.string,
  onClick: PropTypes.func,
  onClick1: PropTypes.func
};

class CallsSidebar extends Component {
  static propTypes = {
    openSettingsModal: PropTypes.func.isRequired
  };

  state = { activeItem: "phone" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSettingsClickAction = () => {
    const { openSettingsModal } = this.props;

    openSettingsModal();
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Responsive
        as={Grid.Column}
        width={4}
        className={"CallsScreen__LeftColumn"}
        {...Responsive.onlyComputer}
      >
        <LeftColumn>
          <ErrorBoundary>
            <LeftColumnHeader />
            {activeItem === "phone" && <RecentCallListContainer />}
            {activeItem === "user" && <ContactListContainer />}
            <CallsSidebarMenu
              activeItem={activeItem}
              onClick={this.handleItemClick}
              onClick1={this.handleSettingsClickAction}
            />
          </ErrorBoundary>
        </LeftColumn>
      </Responsive>
    );
  }
}

export default CallsSidebar;
