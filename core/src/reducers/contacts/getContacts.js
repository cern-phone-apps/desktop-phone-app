import * as contactsActions from '../../actions/contacts';

const INITIAL_STATE = {
  fetching: false,
  errors: undefined,
  contacts: []
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case contactsActions.GET_CONTACTS_REQUEST:
      return {
        ...state,
        fetching: true,
        errors: undefined
      };

    case contactsActions.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        contacts: action.payload,
        errors: undefined
      };

    case contactsActions.GET_CONTACTS_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: 'Error fetching the contacts'
      };
    default:
      return state;
  }
};

export default contactsReducer;
