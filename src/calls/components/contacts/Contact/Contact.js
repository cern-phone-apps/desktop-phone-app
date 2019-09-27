import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Icon } from 'semantic-ui-react';

import { formatUserOrganization } from 'calls/utils/formatters';
import styles from './Contact.module.css';

class Contact extends Component {
  static propTypes = {
    contact: PropTypes.shape({
      displayName: PropTypes.string.isRequired
    }).isRequired,
    selectContact: PropTypes.func.isRequired
  };

  selectContactAction = () => {
    const { contact, selectContact, findUserById } = this.props;
    selectContact(contact);
    findUserById(contact.personId);
  };

  render() {
    const { contact } = this.props;
    return (
      <Item className="" onClick={this.selectContactAction} tabIndex="0" aria-label={`Contact ${contact.displayName}`}>
        <div className={`ui tiny image ${styles.avatar}`}>
          <Icon
            name="user circle"
            size="big"
            color="blue"
            className="ui avatar"
          />
        </div>
        <Item.Content>
          <Item.Header className="">
            {contact ? contact.displayName : ''}
          </Item.Header>
          <Item.Extra>
            {contact ? formatUserOrganization(contact) : ''}
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default Contact;
