import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, Menu, Responsive } from 'semantic-ui-react';
import RecentCallListContainer from 'calls/components/recent_calls/RecentCallList';
import LeftColumn from 'common/components/LeftColumn/LeftColumn';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';
import LeftColumnHeader from 'common/components/LeftColumnHeader/LeftColumnHeader';
import ContactList from 'calls/components/contacts/ContactsList/ContactList';

function CallsSidebarMenu(props) {
  return (
    <Menu icon size="massive" fluid widths={3}>
      <Menu.Item
        tabIndex="1"
        name="phone"
        aria-label="Recent calls"
        active={props.activeItem === 'phone'}
        onClick={props.onClick}
        onKeyPress={e => {
          if (e.charCode === 13) props.onClick(e, { name: 'phone' });
        }}
      >
        <Icon name="phone" />
      </Menu.Item>

      <Menu.Item
        tabIndex="1"
        aria-label="Contact list"
        name="user"
        active={props.activeItem === 'user'}
        onClick={props.onClick}
        onKeyPress={e => {
          if (e.charCode === 13) props.onClick(e, { name: 'user' });
        }}
      >
        <Icon name="user" />
      </Menu.Item>

      <Menu.Item
        tabIndex="1"
        name="settings"
        aria-label="Settings"
        onClick={props.onClick1}
        onKeyPress={e => {
          if (e.charCode === 13) props.onClick1(e, { name: 'settings' });
        }}
      >
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

  state = { activeItem: 'phone' };

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
        className="CallsScreen__LeftColumn"
        {...Responsive.onlyComputer}
      >
        <LeftColumn>
          <ErrorBoundary>
            <LeftColumnHeader />
            {activeItem === 'phone' && <RecentCallListContainer />}
            {activeItem === 'user' && <ContactList />}
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
