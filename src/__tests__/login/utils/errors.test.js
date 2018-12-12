import React from "react";
import Cookies from "js-cookie";

import {
  getAccessToken,
} from "login/utils/tokens";

const cookiesGet = Cookies.get;

it("is able to retrieve access token undefined", () => {
  Cookies.get = cookiesGet;
  const token = getAccessToken();
  expect(token).toBe(undefined);
});