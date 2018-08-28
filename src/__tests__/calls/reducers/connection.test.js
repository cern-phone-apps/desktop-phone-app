import * as actions from 'calls/actions/connection'
import reducer from 'calls/reducers/connection'

describe('connection reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        connected: false,
        activeNumber: '',
        connecting: false,
        disconnecting: false,
        error: {}
      }
    )
  })

  it('should handle CONNECT_REQUEST', () => {
    expect(
      reducer({}, {
        type: actions.CONNECT_REQUEST
      })
    ).toEqual(
      {
        connected: false,
        connecting: true,
        error: {}
      }
    )
  })

  it('should handle CONNECT_SUCCESS', () => {
    expect(
      reducer({}, {
        type: actions.CONNECT_SUCCESS
      })
    ).toEqual(
      {
        connected: true,
        connecting: false,
        error: {}
      }
    )
  })

  it('should handle DISCONNECT_REQUEST', () => {
    expect(
      reducer({}, {
        type: actions.DISCONNECT_REQUEST
      })
    ).toEqual(
      {
        disconnecting: true
      }
    )
  })

  it('should handle DISCONNECT_SUCCESS', () => {
    expect(
      reducer({}, {
        type: actions.DISCONNECT_SUCCESS
      })
    ).toEqual(
      {
        connected: false,
        disconnecting: false,
        error: {}
      }
    )
  })

  it('should handle CONNECT_FAILURE', () => {
    expect(
      reducer({}, {
        type: actions.CONNECT_FAILURE,
        errors: {
          code: {
            status_code: 1
          },
          description: "bla bla bla"
        }
      })
    ).toEqual(
      {
        connected: false,
        connecting: false,
        error: {message: "bla bla bla", statusCode: 1}
      }
    )
  })

  it('should handle DISCONNECT_FAILURE', () => {
    expect(
      reducer({}, {
        type: actions.DISCONNECT_FAILURE,
        errors: {
          code: {
            status_code: 1
          },
          description: "bla bla bla"
        }
      })
    ).toEqual(
      {
        connected: false,
        connecting: false,
        error: {message: "bla bla bla", statusCode: 1}
      }
    )
  })

})