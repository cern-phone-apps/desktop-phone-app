import { combineReducers } from 'redux';
import getContacts from './getContacts';
import addContacts from './addContacts';
import removeContacts from './removeContacts';
import modal from './modal';
import emergencyModal from './emergencyModal';

const contactsReducer = combineReducers({
  getContacts,
  addContacts,
  removeContacts,
  modal,
  emergencyModal
});

export default contactsReducer;
