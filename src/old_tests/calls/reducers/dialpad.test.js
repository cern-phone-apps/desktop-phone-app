import * as actions from 'calls/actions/dialpad'
import reducer from 'calls/reducers/dialpad'

describe('dialpad reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        display: false, value: ''
      }
    )
  });

  it('should handle TOGGLE_DIALPAD', () => {
    expect(
      reducer({}, {
        type: actions.TOGGLE_DIALPAD,
        newStatus: true
      })
    ).toEqual(
      {
        display: true
      }
    )
  });

  it('should handle TOGGLE_DIALPAD', () => {
    expect(
      reducer({}, {
        type: actions.TOGGLE_DIALPAD,
        newStatus: false
      })
    ).toEqual(
      {
        display: false
      }
    )
  });

  it('should handle DIALPAD_NUMBER_UPDATED', () => {
    expect(
      reducer({}, {
        type: actions.DIALPAD_NUMBER_UPDATED,
        newValue: '1'
      })
    ).toEqual(
      {
        value:'1'
      }
    )
  })

});