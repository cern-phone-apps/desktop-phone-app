import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import dialBackendApi from 'services/api';

import styles from './ContactAddButton.module.css';

function ContactAddButton({ contact }) {
  const [hasContact, setHasContact] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const contacts = useSelector(state => state.contacts.getContacts.contacts);
  const added = useSelector(state => state.contacts.addContacts.added);
  const removed = useSelector(state => state.contacts.removeContacts.removed);
  const dispatch = useDispatch();
  const addContact = async () => {
    await dispatch(dialBackendApi().addUserContact(contact));
    setHasContact(true);
  };
  const removeContact = async () => {
    await dispatch(dialBackendApi().removeUserContact(contact.personId));
    setHasContact(false);
  };

  useEffect(() => {
    const ids =
      contacts === undefined || contacts.contacts === undefined
        ? []
        : contacts.contacts.map(a => a.personId.toString());
    if (
      ids.includes(contact.personId) ||
      ids.includes(contact.personId.toString())
    ) {
      setHasContact(true);
    } else {
      setHasContact(false);
    }
    setIsLoading(false);
  }, [added, removed, contacts, contact]);

  if (isLoading) {
    return <Icon loading name="sync" size="small" />;
  }

  if (hasContact) {
    return (
      <Icon
        name="star"
        className={styles.ContactAddButton}
        size="big"
        color="yellow"
        onClick={removeContact}
        tabIndex="0"
        aria-label="Remove this contact"
      />
    );
  }

  return (
    <Icon
      name="star"
      className={styles.ContactAddButton}
      size="big"
      color="grey"
      onClick={addContact}
      tabIndex="0"
      aria-label="Add this contact"
    />
  );
}

ContactAddButton.propTypes = {
  contact: PropTypes.shape({
    personId: PropTypes.string.isRequired
  }).isRequired
};

export default ContactAddButton;
