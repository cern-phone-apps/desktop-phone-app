import * as modalActions from 'settings/actions/modal';

const initialState = {
  modalOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case modalActions.OPEN_SETTINGS_MODAL:
      return {
        ...state,
        modalOpen: true
      };
    case modalActions.CLOSE_SETTINGS_MODAL:
      return {
        ...state,
        modalOpen: false
      };
    default:
      return state;
  }
};
