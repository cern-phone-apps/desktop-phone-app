import React from "react";
import "i18n";
import { Dial } from "external/DummyAPIClient";

it("constructor works", () => {
  const dial = new Dial({});
});

it("buildEvent works", () => {
  const event = Dial.buildEvent(
    "aaa",
    { hello: "world" },
    1234,
    "This is the error message"
  );
  expect(event).toEqual({
    data: { hello: "world" },
    error: { code: 1234, description: "This is the error message" },
    name: "aaa"
  });
});

it("sendEvent works", () => {
  const dial = new Dial({});

  const event = dial.sendEvent({ hello: "world" });
  expect(event).toEqual({ hello: "world" });
});

it("getNotifier works", () => {
  const dial = new Dial({});

  const event = dial.getNotifier();
  expect(event).toHaveProperty("_events");
});

it("authenticate works", () => {
  const dial = new Dial({});

  const event = dial.authenticate("1111", "bbbb");
  expect(event).toEqual({ data: {}, name: "registered" });
});

it("call works", () => {
  const dial = new Dial({});

  const event = dial.call();
  expect(event).toEqual({ data: {}, name: "accepted" });
});

it("answer works", () => {
  const dial = new Dial({});

  const event = dial.answer();
  expect(event).toEqual({ data: {}, name: "Invite accepted" });
});

it("hangUp works", () => {
  const dial = new Dial({});

  const event = dial.hangUp();
  expect(event).toEqual({ data: {}, name: "terminated" });
});

it("sendDTMF works", () => {
  const dial = new Dial({});

  const event = dial.sendDTMF(1);
  expect(event).toEqual(1);
});

it("stopAgent works", async () => {
  const dial = new Dial({});

  const event = await dial.stopAgent();
  expect(event).toEqual(true);
});
