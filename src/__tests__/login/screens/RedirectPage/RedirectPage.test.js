import React from "react";
import RedirectPage from "auth/screens/RedirectPage/RedirectPage";

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

it("renders Redirect strings when logged in", () => {
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

  expect(wrapper.debug()).toContain("<Redirect");
  expect(wrapper.debug()).toContain("to=\"/login/\"");
});

it("renders Redirect to Home when logged in", () => {
  const login = async code => {
    return { loggedIn: true };
  };
  const getMe = jest.fn();
  const wrapper = shallow(
    <RedirectPage
      login={login}
      isAuthenticated={true}
      urlQuery={""}
      getMe={getMe}
      loginInProgress={false}
    />
  );

  expect(wrapper.debug()).toContain("<Redirect");
  expect(wrapper.debug()).toContain("to=\"/\"");
});

it("renders LoadingDimmer when logging in", () => {
  const login = async code => {
    return { loggedIn: false };
  };
  const getMe = jest.fn();
  const wrapper = shallow(
    <RedirectPage
      login={login}
      isAuthenticated={false}
      urlQuery={""}
      getMe={getMe}
      loginInProgress={true}
    />
  );

  expect(wrapper.debug()).toContain("LoadingDimmer");
});

it("triggers login function if code on query args", async () => {

  const asyncLogin = jest
    .fn()
    .mockResolvedValueOnce({loggedIn: true})
    .mockRejectedValueOnce(new Error('Async error'));

  // const login = jest.fn();
  const getMe = jest.fn();
  const wrapper = shallow(
    <RedirectPage
      login={asyncLogin}
      isAuthenticated={false}
      urlQuery={'&code=12345'}
      getMe={getMe}
      loginInProgress={true}
    />
  );
  await expect(asyncLogin).toHaveBeenCalled();
  expect(getMe).toHaveBeenCalled();
  expect(wrapper.debug()).toContain("LoadingDimmer");
});
