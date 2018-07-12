import * as actions from 'common/actions/sidebar'

describe('sidebar actions', () => {
  it('should create an action to display sidebar', () => {
    const expectedAction = {
      type: actions.DISPLAY_SIDEBAR
    }
    expect(actions.displaySidebar()).toEqual(expectedAction)
  })

  it('should create an action to hide the sidebar', () => {
    const expectedAction = {
      type: actions.HIDE_SIDEBAR
    }
    expect(actions.hideSidebar()).toEqual(expectedAction)
  })

  it('should create an action when is displaying', () => {
    const expectedAction = {
      type: actions.IS_DISPLAYING
    }
    expect(actions.displayingSidebar()).toEqual(expectedAction)
  })

  it('should create an action when is hiding', () => {
    const expectedAction = {
      type: actions.FINISHED_DISPLAYING
    }
    expect(actions.finishedDisplayingSidebar()).toEqual(expectedAction)
  })

})
