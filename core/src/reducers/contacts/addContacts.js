import * as contactsActions from '../../actions/contacts';

const INITIAL_STATE = {
  adding: false,
  added: false,
  errors: undefined
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case contactsActions.ADD_CONTACTS_REQUEST:
      return {
        ...state,
        adding: true,
        added: false,
        errors: undefined
      };

    case contactsActions.ADD_CONTACTS_SUCCESS:
      return {
        ...state,
        added: true,
        adding: false,
        errors: undefined
      };
    default:
      return state;
  }
};

export default contactsReducer;
