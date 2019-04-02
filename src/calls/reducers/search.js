import * as searchActions from "calls/actions/search";

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
    const division = user.division === "[]" ? "" : user.division;
    const group = user.cernGroup === "[]" ? "" : `-${user.cernGroup}`;
    const section = user.cernSection === "[]" ? "" : `-${user.cernSection}`;
    const displayName = user.displayName;
    return {
      index: index,
      title: displayName,
      description: `${division}${group}${section}`,
      username: user.username
    };
  });
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
      return {
        ...state,
        user: action.user,
        userSelected: true,
      };
    case searchActions.USER_NOT_SELECTED:
      return {
        ...state,
        userSelected: false
      };
    case searchActions.SEARCH_REQUEST:
      return {
        ...state,
        searching: true,
        searchEnable: true,
      };
    case searchActions.SEARCH_END:
      return {
        ...state,
        searching: false,
        searchEnable: false
      };
    case searchActions.SEARCH_CLEAR:
      return {
        ...state,
      };
    case searchActions.SEARCH_SUCCESS:
      return {
        ...state,
        searching: false
      };
    case searchActions.SEARCH_FAILURE:
      return {
        ...state,
        searching: false
      };

    default:
      return state;
  }
};

export default search;
