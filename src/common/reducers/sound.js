import * as soundActions from 'common/actions/sound';

const initialState = {
  ringBackTone: false,
  ringTone: false
};

const sound = (state = initialState, action) => {
  switch (action.type) {
    case soundActions.RINGBACKTONE:
      return {
        ...state,
        ringBackTone: action.enable
      };
    case soundActions.RINGTONE:
      return {
        ...state,
        ringTone: action.enable
      };
    default:
      return state;
  }
};

export default sound;
