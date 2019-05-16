import * as contactsActions from '../../actions/contacts';

const INITIAL_STATE = {
  selectedContact: undefined,
  modalOpen: false
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case contactsActions.SELECT_CONTACT:
      return {
        ...state,
        selectedContact: action.contact,
        modalOpen: true
      };

    case contactsActions.UNSELECT_CONTACT:
      return {
        ...state,
        selectedContact: undefined,
        modalOpen: false
      };
    default:
      return state;
  }
};

export default contactsReducer;
