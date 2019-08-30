import * as actions from "calls/actions/call";
import reducer from "calls/reducers/call";

describe("calls reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      calling: false,
      error: {},
      onCall: false,
      receivingCall: false,
      caller: {
        incoming: false,
        missed: true,
        name: "",
        phoneNumber: "",
        startTime: null
      }
    });
  });

  it("should handle CALL", () => {
    expect(
      reducer(
        {},
        {
          type: actions.CALL
        }
      )
    ).toEqual({
      calling: true,
      onCall: false,
      caller: {
        incoming: false,
        missed: false
      }
    });
    expect(
      reducer(
        {},
        {
          type: actions.CALL,
          caller: {
            name: "michael",
            phoneNumber: "123456",
            incoming: false,
            missed: false
          }
        }
      )
    ).toEqual({
      calling: true,
      onCall: false,
      caller: {
        name: "michael",
        phoneNumber: "123456",
        incoming: false,
        missed: false
      }
    });
  });

  it("should handle OUTGOING_CALL_ACCEPTED", () => {
    expect(
      reducer(
        { calling: true },
        {
          type: actions.OUTGOING_CALL_ACCEPTED
        }
      )
    ).toEqual({
      calling: false,
      onCall: true,
      receivingCall: false
    });
    expect(
      reducer(
        {},
        {
          type: actions.OUTGOING_CALL_ACCEPTED
        }
      )
    ).toEqual({});
  });

  it("should handle OUTGOING_CALL_REJECTED", () => {
    expect(
      reducer(
        { calling: true },
        {
          type: actions.OUTGOING_CALL_REJECTED,
          errors: {
            code: {
              status_code: 1
            },
            description: "bla bla bla"
          }
        }
      )
    ).toEqual({
      calling: false,
      error: { message: "bla bla bla", statusCode: 1 },
      onCall: false,
      receivingCall: false
    });
  });

  it("should handle CALL_FAILED", () => {
    expect(
      reducer(
        { calling: true },
        {
          type: actions.CALL_FAILED,
          errors: {
            code: {
              status_code: 1
            },
            description: "bla bla bla"
          }
        }
      )
    ).toEqual({
      onCall: false,
      calling: false,
      error: { statusCode: 1, message: "bla bla bla" }
    });
  });

  it("should handle CALL_MISSED", () => {
    expect(
      reducer(
        {},
        {
          type: actions.CALL_MISSED
        }
      )
    ).toEqual({
      onCall: false,
      calling: false
    });
  });

  it("should handle IS_RECEIVING_CALL", () => {
    expect(
      reducer(
        {},
        {
          type: actions.IS_RECEIVING_CALL
        }
      )
    ).toEqual({
      onCall: false,
      receivingCall: true,
      caller: {
        incoming: true,
        missed: true,
        name: undefined,
        phoneNumber: undefined
      }
    });
  });

  it("should handle INCOMING_CALL_ACCEPTED", () => {
    expect(
      reducer(
        {},
        {
          type: actions.INCOMING_CALL_ACCEPTED
        }
      )
    ).toEqual({
      onCall: true,
      receivingCall: false,
      caller: {
        missed: false,
        startTime: expect.any(Number)
      }
    });
  });

  it("should handle INCOMING_CALL_REJECTED", () => {
    expect(
      reducer(
        {},
        {
          type: actions.INCOMING_CALL_REJECTED
        }
      )
    ).toEqual({
      onCall: false,
      receivingCall: false,
      caller: {
        missed: true,
        startTime: expect.any(Number)
      }
    });
  });

  it("should handle HANGUP_CALL", () => {
    expect(
      reducer(
        {},
        {
          type: actions.HANGUP_CALL
        }
      )
    ).toEqual({
      onCall: false,
      calling: false,
      caller: {}
    });
  });


});
