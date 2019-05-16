import * as contactsActions from '../../actions/contacts';

const INITIAL_STATE = {
  emergencyModalOpen: false
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
