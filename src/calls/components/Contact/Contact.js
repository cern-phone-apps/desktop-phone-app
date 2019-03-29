import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item, Icon } from "semantic-ui-react";

import styles from "./Contact.module.css";
import { formatUserOrganization } from "calls/utils/formatters";

class Contact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
    selectContact: PropTypes.func.isRequired
  };

  selectContactAction = () => {
    const { contact, selectContact } = this.props;
    selectContact(contact);
  };

  render() {
    const { contact } = this.props;

    return (
      <Item className={``} onClick={this.selectContactAction}>
        <div className={`ui tiny image ${styles.avatar}`}>
          <Icon
            name="user circle"
            size={"big"}
            color={"blue"}
            className={"ui avatar"}
          />
        </div>
        <Item.Content>
          <Item.Header className={``}>{contact.displayName}</Item.Header>
          <Item.Extra>{formatUserOrganization(contact)}</Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default Contact;
