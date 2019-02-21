import React from "react";
import * as actions from "calls/actions/profile";

describe("CalleeProfile Component tests", () => {

  it("should create and endpoint for the profile api", () => {
    const value = "USERNAME";
    const expectedResult = `http://localhost:7075/api/v1/users/?username=${value}`;
    expect(actions.buildProfileEndpoint(value)).toEqual(expectedResult);
  });

});