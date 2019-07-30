import * as contactsActions from '../../actions/contacts';

const INITIAL_STATE = {
  removing: false,
  removed: false,
  errors: undefined
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case contactsActions.REMOVE_CONTACTS_REQUEST:
      return {
        ...state,
        removing: true,
        removed: false,
        errors: undefined
      };

    case contactsActions.REMOVE_CONTACTS_SUCCESS:
      return {
        ...state,
        removing: false,
        removed: true,
        errors: undefined
      };
    case contactsActions.REMOVE_CONTACTS_FAILURE:
        return {
          ...state,
          errors: action.payload.error
        };
    default:
      return state;
  }
};

export default contactsReducer;
