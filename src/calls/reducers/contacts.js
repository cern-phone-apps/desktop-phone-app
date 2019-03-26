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
  contacts: []
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case contactsActions.GET_CONTACTS_REQUEST:
      return {
        ...state,
        fetching: true,
        errors: {
          ...state,
          fetching: undefined
        }
      };

    case contactsActions.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        contacts: action.payload.result,
        errors: {
          ...state,
          fetching: undefined
        }
      };

    case contactsActions.GET_CONTACTS_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: {
          ...state,
          fetching: "Error fetching the contacts"
        }
      };

    case contactsActions.ADD_CONTACTS_REQUEST:
      return {
        ...state,
        adding: true,
        added: false,
        errors: {
          ...state,
          adding: undefined
        }
      };

    case contactsActions.ADD_CONTACTS_SUCCESS:
      return {
        ...state,
        added: true,
        adding: false,
        errors: {
          ...state,
          adding: undefined
        }
      };

    case contactsActions.ADD_CONTACTS_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: {
          ...state,
          adding: "Error adding the contact"
        }
      };

    case contactsActions.SELECT_CONTACT:
      return {
        ...state,
        selectedModal: {
          selectedContact: action.contact,
          modalOpen: true
        },
      };

    case contactsActions.UNSELECT_CONTACT:
      return {
        ...state,
        selectedModal: {
          selectedContact: undefined,
          modalOpen: false
        },
      };
    default:
      return state;
  }
};

export default contactsReducer;
