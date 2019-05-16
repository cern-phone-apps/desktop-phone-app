import * as searchActions from '../actions/search';

const initialState = {
  userSelected: false,
  searching: false,
  searchEnable: false
};

/**
 * Formats an array of users to a format for the search results field.
 * The only fields that matter here for the search field are title and description.
 *
 * @param usersArray Array of dict
 * @returns {*} Array of dict with the users formatted.
 */
export function getUsersFormattedForSearch(usersArray) {
  if (usersArray === undefined) {
    return [];
  }

  return usersArray.slice(0, 9).map(function(user, index) {
    const division = user.division === '[]' ? '' : user.division;
    const group = user.cernGroup === '[]' ? '' : `-${user.cernGroup}`;
    const section = user.cernSection === '[]' ? '' : `-${user.cernSection}`;
    const { displayName } = user;
    return {
      index,
      title: displayName,
      description: `${division}${group}${section}`,
      username: user.username
    };
  });
}

function setUserSelected(state, action) {
  return {
    ...state,
    user: action.user,
    userSelected: true
  };
}

function setUserNotSelected(state) {
  return {
    ...state,
    userSelected: false
  };
}

function makeSearchRequest(state) {
  return {
    ...state,
    searching: true,
    searchEnable: true
  };
}

function setSearchFinished(state) {
  return {
    ...state,
    searching: false,
    searchEnable: false
  };
}

function setSearchSuccess(state) {
  return {
    ...state,
    searching: false
  };
}

function setSearchFailure(state) {
  return {
    ...state,
    searching: false
  };
}

/**
 * Reducer used for the search state.
 *
 * @param state
 * @param action
 * @returns {{userSelected: boolean, value: string, searchResults: Array}}
 */
const search = (state = initialState, action) => {
  switch (action.type) {
    case searchActions.USER_SELECTED:
      return setUserSelected(state, action);
    case searchActions.USER_NOT_SELECTED:
      return setUserNotSelected(state);
    case searchActions.SEARCH_REQUEST:
      return makeSearchRequest(state);
    case searchActions.SEARCH_END:
      return setSearchFinished(state);
    case searchActions.SEARCH_CLEAR:
      return {
        ...state
      };
    case searchActions.SEARCH_SUCCESS:
      return setSearchSuccess(state);
    case searchActions.SEARCH_FAILURE:
      return setSearchFailure(state);

    default:
      return state;
  }
};

export default search;
