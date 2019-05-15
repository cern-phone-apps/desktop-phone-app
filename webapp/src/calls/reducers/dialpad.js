import * as dialpadActions from 'calls/actions/dialpad'

const initialState = {
  display: false,
  value: ''
};

export default (state = initialState, action) => {
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
      return state
  }
}

