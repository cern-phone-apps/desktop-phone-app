import * as actions from 'common/actions/sidebar'
import reducer from 'common/reducers/sidebar'

describe('sidebar reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        isVisible: false,
        isDisplaying: false,
        contentDimmed: false,
        displayTime: 500
      }
    )
  })

  it('should handle DISPLAY_SIDEBAR', () => {
    expect(
      reducer({}, {
        type: actions.DISPLAY_SIDEBAR
      })
    ).toEqual(
      {contentDimmed: true, isDisplaying: true, isVisible: true}
    )
  })

  it('should handle IS_DISPLAYING', () => {
    expect(
      reducer({}, {
        type: actions.IS_DISPLAYING
      })
    ).toEqual(
      {contentDimmed: true, isDisplaying: true, isVisible: true}
    )
  })

  it('should handle FINISHED_DISPLAYING', () => {
    expect(
      reducer({}, {
        type: actions.FINISHED_DISPLAYING
      })
    ).toEqual(
      {isDisplaying: false}
    )
  })

  it('should handle HIDE_SIDEBAR', () => {
    expect(
      reducer({
        isVisible: true,
        isDisplaying: false,
        contentDimmed: true,
        displayTime: 500
      }, {
        type: actions.HIDE_SIDEBAR
      })
    ).toEqual(
      {contentDimmed: false, displayTime: 500, isDisplaying: false, isVisible: false}
    )
  })

})