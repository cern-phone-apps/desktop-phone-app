import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Icon, Menu, Responsive } from "semantic-ui-react";
import RecentCallListContainer from "calls/components/RecentCallList";
import LeftColumn from "common/components/LeftColumn/LeftColumn";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import LeftColumnHeader from "common/components/LeftColumnHeader/LeftColumnHeader";
import ContactListContainer from "calls/components/ContactsList/ContactListContainer";

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
            <Menu icon size="massive" fluid widths={3}>
              <Menu.Item
                name="phone"
                active={activeItem === "phone"}
                onClick={this.handleItemClick}
              >
                <Icon name="phone" />
              </Menu.Item>

              <Menu.Item
                name="user"
                active={activeItem === "user"}
                onClick={this.handleItemClick}
              >
                <Icon name="user" />
              </Menu.Item>

              <Menu.Item
                name="settings"
                onClick={this.handleSettingsClickAction}
              >
                <Icon name="settings" />
              </Menu.Item>
            </Menu>
          </ErrorBoundary>
        </LeftColumn>
      </Responsive>
    );
  }
}

export default CallsSidebar;
