import React from "react";
import { LoginPage } from "login/screens/LoginPage/LoginPage";

it("renders without crashing", () => {
  const loader = shallow(
    <LoginPage t={key => key} isAuthenticated={false} loginInProgress={false} />
  );

  expect(loader.text()).toEqual("<ErrorBoundary />");
  expect(loader.debug()).toContain("LoginPage");
  expect(loader.debug()).toContain("LoginButton");
});
