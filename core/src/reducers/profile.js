import * as usersActions from '../actions/users';

const initialState = {
  profile: {},
  fetching: false,
  error: undefined
};

/**
 * Reducer used for the search state.
 *
 * @param state
 * @param action
 * @returns {{userSelected: boolean, value: string, searchResults: Array}}
 */
const search = (state = initialState, action) => {
  switch (action.type) {
    case usersActions.PROFILE_REQUEST:
      return {
        ...state,
        profile: {},
        fetching: true,
        error: undefined
      };
    case usersActions.PROFILE_SUCCESS:
      return {
        ...state,
        fetching: false,
        profile: action.payload,
        error: undefined
      };
    case usersActions.PROFILE_FAILURE:
      return {
        ...state,
        fetching: false,
        profile: {},
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default search;
