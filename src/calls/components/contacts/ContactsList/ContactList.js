import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Item } from 'semantic-ui-react';
import dialBackendApi from 'services/api';

import ScrollableContent from 'common/components/ScrollableContent/ScrollableContent';
import ContactContainer from 'calls/components/contacts/Contact/ContactContainer';
import ContactProfileModalContainer from 'calls/components/contacts/ContactProfileModal/ContactProfileModalContainer';
import ContactEmergencyItemContainer from 'calls/components/contacts/ContactEmergencyItem/ContactEmergencyItemContainer';
import ContactEmergencyModalContainer from 'calls/components/contacts/ContactEmergencyModal/ContactEmergencyModalContainer';

export function ContactList() {
  const contacts = useSelector(state => state.contacts.getContacts.contacts);
  const added = useSelector(state => state.contacts.addContacts.added);
  const removed = useSelector(state => state.contacts.removeContacts.removed);

  const dispatch = useDispatch();

  useEffect(() => {
    const getContacts = () => dispatch(dialBackendApi().getUserContacts());

    const fetchContacts = async () => {
      await getContacts();
    };

    fetchContacts();
  }, [added, removed, dispatch]);

  return (
    <ScrollableContent>
      <Item.Group link>
        <ContactEmergencyItemContainer />
        {contacts &&
          contacts.contacts &&
          contacts.contacts.map((item, index) => (
            <ContactContainer
              key={`recent-${index.toString()}`}
              contact={item}
            />
          ))}
      </Item.Group>
      <ContactProfileModalContainer />
      <ContactEmergencyModalContainer />
    </ScrollableContent>
  );
}

export default ContactList;
