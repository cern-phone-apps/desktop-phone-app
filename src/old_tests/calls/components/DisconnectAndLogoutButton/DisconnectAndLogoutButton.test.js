import { shallow } from "enzyme/build";
import React from "react";
import {DisconnectAndLogoutButton} from "calls/components/DisconnectAndLogoutButton/DisconnectAndLogoutButton";

describe("DisconnectAndLogoutButton Tests", () => {
  it("renders DisconnectAndLogoutButton without crashing", () => {
    const logout = jest.fn();
    const unAutehnticateUser = jest.fn();

    const phoneService = {
      unAutehnticateUser: unAutehnticateUser
    };

    const wrapper = shallow(
      <DisconnectAndLogoutButton
        connected={true}
        disconnecting={false}
        displayMessage
        logout={logout}
        phoneService={phoneService}/>
    );

    expect(wrapper.text()).toEqual("<Button />");
  });


  it("renders triggers disconnect", () => {
    const logout = jest.fn();
    const unAuthenticateUser = jest.fn();

    const phoneService = {
      unAuthenticateUser: unAuthenticateUser
    };

    const wrapper = shallow(
      <DisconnectAndLogoutButton
        connected={true}
        disconnecting={false}
        displayMessage
        logout={logout}
        phoneService={phoneService}/>
    );

    wrapper.instance().disconnect();
    expect(logout).toHaveBeenCalled();
    expect(unAuthenticateUser).toHaveBeenCalled();
  });

});