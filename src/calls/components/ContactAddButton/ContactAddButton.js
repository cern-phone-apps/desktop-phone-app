import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import { logMessage } from "common/utils/logs";
import PropTypes from "prop-types";

class ContactAddButton extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
    contacts: PropTypes.array.isRequired,
    addUserContact: PropTypes.func.isRequired,
    removeUserContact: PropTypes.func.isRequired,
    getUserContacts: PropTypes.func.isRequired
  };

  state = {
    loading: true,
    deleting: true,
    hasContact: false
  };

  async componentDidMount() {
    const { getUserContacts, contacts, contact } = this.props;
    this.setState({ loading: true });
    const newContacts = await getUserContacts();
    logMessage(newContacts);
    if(newContacts && newContacts.payload){
      let ids = newContacts.payload.result.map(a => a.personId.toString());
      logMessage(ids.includes(contact.personId));
      if (ids.includes(contact.personId)) {
        this.setState({ hasContact: true });
      }
      this.setState({ loading: false });
    }
  }

  addContactAction = async () => {
    const { addUserContact, contact, getUserContacts } = this.props;
    logMessage(`Adding contact`);
    logMessage(contact);
    this.setState({ loading: true });
    await addUserContact(contact);
    this.setState({ loading: false });
    this.setState({ hasContact: true });
    getUserContacts();
  };

  removeContactAction = async () => {
    const { removeUserContact, contact, getUserContacts } = this.props;
    logMessage(`Removing contact...`);
    this.setState({ loading: true });
    await removeUserContact(contact.personId);
    this.setState({ loading: false });
    this.setState({ hasContact: false });
    getUserContacts();
  };

  render() {
    const { loading, hasContact } = this.state;

    if (loading) {
      return <Icon loading name="sync" size={"small"} />;
    }

    if (hasContact) {
      return (
        <Icon name="star" size='big' color={"yellow"} onClick={this.removeContactAction} />
      );
    }

    return <Icon name="star" size='big' color={"grey"} onClick={this.addContactAction} />;
  }
}

export default ContactAddButton;
