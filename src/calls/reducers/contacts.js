import * as contactsActions from "calls/actions/contacts";

const INITIAL_STATE = {
  adding: false,
  added: false,
  errors: {
    adding: undefined
  },
  emergencyModalOpen: false
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case contactsActions.ADD_CONTACTS_REQUEST:
      return {
        ...state,
        adding: true,
        added: false,
        errors: {
          ...state.errors,
          adding: undefined
        }
      };

    case contactsActions.ADD_CONTACTS_SUCCESS:
      return {
        ...state,
        added: true,
        adding: false,
        errors: {
          ...state.errors,
          adding: undefined
        }
      };

    case contactsActions.ADD_CONTACTS_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: {
          ...state.errors,
          adding: "Error adding the contact"
        }
      };
    case contactsActions.OPEN_EMERGENCY_MODAL:
      return {
        ...state,
        emergencyModalOpen: true
      };
    case contactsActions.CLOSE_EMERGENCY_MODAL:
      return {
        ...state,
        emergencyModalOpen: false
      };
    default:
      return state;
  }
};

export default contactsReducer;
