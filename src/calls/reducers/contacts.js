import * as contactsActions from "calls/actions/contacts";

const INITIAL_STATE = {
  fetching: false,
  adding: false,
  added: false,
  errors: {
    fetching: undefined,
    adding: undefined
  },
  selectedModal: {
    selectedContact: undefined,
    modalOpen: false
  },
  contacts: [],
  emergencyModalOpen: false
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case contactsActions.GET_CONTACTS_REQUEST:
      return {
        ...state,
        fetching: true,
        errors: {
          ...state.errors,
          fetching: undefined
        }
      };

    case contactsActions.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        contacts: action.payload.result,
        errors: {
          ...state.errors,
          fetching: undefined
        }
      };

    case contactsActions.GET_CONTACTS_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: {
          ...state.errors,
          fetching: "Error fetching the contacts"
        }
      };

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

    case contactsActions.SELECT_CONTACT:
      return {
        ...state,
        selectedModal: {
          selectedContact: action.contact,
          modalOpen: true
        }
      };

    case contactsActions.UNSELECT_CONTACT:
      return {
        ...state,
        selectedModal: {
          selectedContact: undefined,
          modalOpen: false
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
