import { combineReducers } from 'redux';
import getContacts from './getContacts';
import addContacts from './addContacts';
import modal from './modal';
import emergencyModal from './emergencyModal';

const contactsReducer = combineReducers({
  getContacts,
  addContacts,
  modal,
  emergencyModal
});

export default contactsReducer;
