import * as dialpadActions from '../actions/dialpad';

const INITIAL_STATE = {
  display: false,
  value: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dialpadActions.DIALPAD_NUMBER_UPDATED:
      return {
        ...state,
        value: action.newValue
      };
    case dialpadActions.TOGGLE_DIALPAD:
      return {
        ...state,
        display: action.newStatus
      };
    default:
      return state;
  }
};
