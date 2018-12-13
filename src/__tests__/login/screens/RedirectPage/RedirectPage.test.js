import React from "react";
import RedirectPage from "login/screens/RedirectPage/RedirectPage";

it("renders without crashing", () => {
  const login = async code => {
    return { loggedIn: true };
  };
  const getMe = jest.fn();
  const wrapper = shallow(
    <RedirectPage
      login={login}
      isAuthenticated={false}
      urlQuery={""}
      getMe={getMe}
      loginInProgress={false}
    />
  );

  expect(wrapper.text()).toEqual("<Redirect />");
});
