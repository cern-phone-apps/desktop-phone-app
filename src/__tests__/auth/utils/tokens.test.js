import React from "react";
import Cookies from "js-cookie";

import {
  getAccessToken,
  getRefreshToken,
  isAccessTokenExpired, isRefreshTokenExpired, withAuth, withRefresh
} from "auth/utils/tokens";

const cookiesGet = Cookies.get;

it("is able to retrieve access token undefined", () => {
  Cookies.get = cookiesGet;
  const token = getAccessToken();
  expect(token).toBe(undefined);
});

it("is able to retrieve access token with value", () => {
  Cookies.get = jest.fn().mockImplementation(() => "12345");
  const token = getAccessToken();
  expect(token).toBe("12345");
});

it("is able to check if access token is not expired", () => {
  Cookies.get = jest.fn().mockImplementation(() => "12345");
  const token = isAccessTokenExpired();
  expect(token).toBe(false);
});

it("is able to check if access token is expired", () => {
  Cookies.get = cookiesGet;
  const token = isAccessTokenExpired();
  expect(token).toBe(true);
});

it("is able to retrieve refresh token undefined", () => {
  Cookies.get = cookiesGet;
  const token = getRefreshToken();
  expect(token).toBe(undefined);
});

it("is able to retrieve refresh token with value", () => {
  Cookies.get = jest.fn().mockImplementation(() => "12345");
  const token = getRefreshToken();
  expect(token).toBe("12345");
});

it("is able to check if refresh token is expired", () => {
  Cookies.get = cookiesGet;
  const token = isRefreshTokenExpired();
  expect(token).toBe(true);
});

it("is able to check if refresh token is not expired", () => {
  Cookies.get = jest.fn().mockImplementation(() => "12345");
  const token = isRefreshTokenExpired();
  expect(token).toBe(false);
});

it("is withAuth built correctly", () => {
  Cookies.get = jest.fn().mockImplementation(() => "12345");
  const func = withAuth();
  const result = func();
  expect(result).toEqual({"X-CSRF-TOKEN": "12345"});
});

it("is withRefresh built correctly", () => {
  Cookies.get = jest.fn().mockImplementation(() => "12345");
  const func = withRefresh();
  const result = func();
  expect(result).toEqual({"X-CSRF-TOKEN": "12345"});
});
