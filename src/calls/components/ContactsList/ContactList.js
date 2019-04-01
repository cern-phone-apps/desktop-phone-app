import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";
import ScrollableContent from "common/components/ScrollableContent/ScrollableContent";
import ContactContainer from "calls/components/Contact/ContactContainer";
import ContactProfileModalContainer from "calls/components/ContactProfileModal/ContactProfileModalContainer";
import ContactEmergencyItemContainer from "calls/components/ContactEmergencyItem/ContactEmergencyItemContainer";
import ContactEmergencyModalContainer from "calls/components/ContactEmergencyModal/ContactEmergencyModalContainer";

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.array,
    getUserContacts: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { getUserContacts } = this.props;
    getUserContacts();
  }

  render() {
    let { contacts } = this.props;

    if (contacts === undefined || contacts === null) {
      contacts = [];
    }

    return (
      <ScrollableContent>
        <Item.Group link>
          <ContactEmergencyItemContainer />
          {contacts.map((item, index) => {
            return <ContactContainer key={`recent-${index}`} contact={item} />;
          })}
        </Item.Group>
        <ContactProfileModalContainer />
        <ContactEmergencyModalContainer />
      </ScrollableContent>
    );
  }
}

export default ContactList;
