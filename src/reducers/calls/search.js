import * as searchActions from 'actions/calls/search'

const initialState = {
  userSelected: false,
  value: '',
  searchResults: []
}

function getUsersFormatted (usersArray) {
  return usersArray.slice(0, 9).map(function (user, index) {
    const division = user.division === '[]' ? '' : user.division
    const group = user.cernGroup === '[]' ? '' : `-${user.cernGroup}`
    const section = user.cernSection === '[]' ? '' : `-${user.cernSection}`
    const displayName = user.displayName
    return {
      title: displayName,
      description: `${division}${group}${section}`
    }
  })
}

const call = (state = initialState, action) => {
  console.debug(`Calling call reducer: ${action.type}`)
  switch (action.type) {
    case searchActions.USER_SELECTED:
      return {
        ...state,
        userSelected: true
      }
    case searchActions.SEARCH_UPDATED:
      return {
        ...state,
        value: action.value
      }
    case searchActions.USER_NOT_SELECTED:
      return {
        ...state,
        userSelected: false
      }
    case searchActions.SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: getUsersFormatted(action.payload)
      }

    default:
      return state
  }
}

export default call
