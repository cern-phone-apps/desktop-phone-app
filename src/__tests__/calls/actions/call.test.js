import * as callActions from "calls/actions/call";
import { CALL_FAILED, HANGUP_CALL, INCOMING_CALL_ACCEPTED, INCOMING_CALL_REJECTED } from "../../../calls/actions/call";

describe("call actions", () => {
  it("should create an action to make call", () => {
    const recipient = "Finish docs";
    const expectedAction = {
      type: callActions.CALL,
      recipient
    };
    expect(callActions.makeCall(recipient)).toEqual(expectedAction);
  });

  it("should create an action to is calling", () => {
    const expectedAction = {
      type: callActions.IS_CALLING
    };
    expect(callActions.isCalling()).toEqual(expectedAction);
  });

  it("should create an action to is receiving call", () => {
    const expectedAction = {
      type: callActions.IS_RECEIVING_CALL
    };
    expect(callActions.isReceivingCall()).toEqual(expectedAction);
  });

  it("should create an action to is accept call", () => {
    const expectedAction = {
      type: callActions.OUTGOING_CALL_ACCEPTED
    };
    expect(callActions.acceptOutgoingCall()).toEqual(expectedAction);
  });

  it("should create an action to reject call", () => {
    const expectedAction = {
      errors: { code: { status_code: 0 } },
      type: "@@call/OUTGOING_CALL_REJECTED"
    };
    expect(callActions.rejectOutgoingCall()).toEqual(expectedAction);
  });

  it("should create an action to miss call", () => {
    const expectedAction = {
      type: callActions.CALL_MISSED
    };
    expect(callActions.missCall()).toEqual(expectedAction);
  });

  it("should create an action to accept incoming call", () => {
    const expectedAction = {
      type: callActions.INCOMING_CALL_ACCEPTED
    };
    expect(callActions.acceptIncomingCall()).toEqual(expectedAction);
  });

  it("should create an action to reject incoming call", () => {
    const expectedAction = {
      type: callActions.INCOMING_CALL_REJECTED
    };
    expect(callActions.rejectIncomingCall()).toEqual(expectedAction);
  });

  it("should create an action that is triggered when a call is rejected", () => {
    const expectedAction = {
      errors: { code: { status_code: 0 } },
      type: "@@call/CALL_FAILED"
    };
    expect(callActions.callFailed()).toEqual(expectedAction);
  });

  it("should create an action that is triggered on hang up", () => {
    const expectedAction = {
      type: callActions.HANGUP_CALL
    };
    expect(callActions.hangupCall()).toEqual(expectedAction);
  });
});
