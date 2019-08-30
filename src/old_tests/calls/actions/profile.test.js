import React from "react";
import * as actions from "calls/actions/profile";
import { buildCallsApiEndpoint } from "calls/actions/numbers";


describe("CalleeProfile Component tests", () => {

  it("should create and endpoint for the profile api", () => {
    const value = `/api/v1/users/?username=USERNAME`;
    const expectedResult = `http://localhost:7075${value}`;
    expect(buildCallsApiEndpoint(value)).toEqual(expectedResult);
  });

});