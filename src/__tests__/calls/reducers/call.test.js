import * as actions from 'calls/actions/call'
import reducer from 'calls/reducers/call'

describe('calls reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        calling: false,
        error: {},
        onCall: false,
        receivingCall: false,
        recipient: {
          incoming: false,
          missed: false,
          name: "",
          phoneNumber: "",
          startTime: null
        }
      }
    )
  })

  it('should handle CALL', () => {
    expect(
      reducer({}, {
        type: actions.CALL
      })
    ).toEqual(
      {
        calling: true,
        onCall: false,
        recipient: undefined
      }
    )
    expect(
      reducer(
        {}
        ,
        {
          type: actions.CALL,
          recipient: {
            name: "michael",
            phoneNumber: "123456",
          }
        }
      )
    ).toEqual(
      {
        calling: true,
        onCall: false,
        recipient: {
          name: "michael",
          phoneNumber: "123456",
        }
      }
    )
  })

  it('should handle CALL_ACCEPTED', () => {
    expect(
      reducer({calling: true}, {
        type: actions.CALL_ACCEPTED
      })
    ).toEqual(
      {
        calling: false,
        onCall: true,
        receivingCall: false
      }
    )
    expect(
      reducer(
        {}
        ,
        {
          type: actions.CALL_ACCEPTED
        }
      )
    ).toEqual(
      {
      }
    )
  })

  it('should handle CALL_REJECTED', () => {
    expect(
      reducer({calling: true}, {
        type: actions.CALL_REJECTED,
        errors: {
          code: {
            status_code: 1
          },
          description: "bla bla bla"
        }
      })
    ).toEqual(
      {
        onCall: false,
        calling: false,
        error: {statusCode: 1, message: "bla bla bla"}
      }
    )
  })


  it('should handle CALL_FAILED', () => {
    expect(
      reducer({calling: true}, {
        type: actions.CALL_FAILED,
        errors: {
          code: {
            status_code: 1
          },
          description: "bla bla bla"
        }
      })
    ).toEqual(
      {
        onCall: false,
        calling: false,
        error: {statusCode: 1, message: "bla bla bla"}
      }
    )
  })

  it('should handle CALL_MISSED', () => {
    expect(
      reducer({}, {
        type: actions.CALL_MISSED
      })
    ).toEqual(
      {
        onCall: false,
        calling: false
      }
    )
  })

  it('should handle IS_RECEIVING_CALL', () => {
    expect(
      reducer({}, {
        type: actions.IS_RECEIVING_CALL
      })
    ).toEqual(
      {
        onCall: false,
        receivingCall: true
      }
    )
  })

  it('should handle HANGUP_CALL', () => {
    expect(
      reducer({}, {
        type: actions.HANGUP_CALL
      })
    ).toEqual(
      {
        onCall: false,
        calling: false,
        recipient: {}
      }
    )
  })

})