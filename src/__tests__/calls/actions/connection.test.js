import * as actions from "calls/actions/connection";
import { DISCONNECT_FAILURE, DISCONNECT_REQUEST, DISCONNECT_SUCCESS } from "../../../calls/actions/connection";

describe("connection actions", () => {
  it("should create an action to connect to sip", () => {
    const expectedAction = {
      type: actions.CONNECT_REQUEST
    };
    expect(actions.requestConnection()).toEqual(expectedAction);
  });

  it("should create an action for successfully connection", () => {
    const expectedAction = {
      type: actions.CONNECT_SUCCESS
    };
    expect(actions.setAuthenticated()).toEqual(expectedAction);
  });

  it("should create an action for failed connection", () => {
    const errors = { error: "This an error" };
    const expectedAction = {
      errors,
      type: actions.CONNECT_FAILURE
    };
    expect(actions.setConnectionFailure(errors)).toEqual(expectedAction);
  });

  it("should create an action to request disconnection to sip", () => {
    const expectedAction = {
      type: actions.DISCONNECT_REQUEST
    };
    expect(actions.requestDisconnection()).toEqual(expectedAction);
  });

  it("should create an action to disconnect from sip", () => {
    const expectedAction = {
      type: actions.DISCONNECT_SUCCESS
    };
    expect(actions.setDisconnected()).toEqual(expectedAction);
  });

  it("should create an action to trigger when failed to disconnect from sip", () => {
    const expectedAction = {
      type: actions.DISCONNECT_FAILURE
    };
    expect(actions.setDisconnectionFailure()).toEqual(expectedAction);
  });

});
