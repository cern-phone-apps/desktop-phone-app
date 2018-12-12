import React from "react";
import { shallow } from "enzyme";
import { CallerDialpad } from "calls/components/dialpads/CallerDialpad/CallerDialpad";

it("renders CallerDialpad without crashing", () => {
  const unSelectUser = jest.fn();

  const wrapper = shallow(
    <CallerDialpad
      updateDialpadValue={() => {}}
      dialpadValue={""}
      phoneService={{}}
      unSelectUser={unSelectUser}
    />
  );

  expect(wrapper.text()).toEqual("<Segment />");
});

it("contain te expected texts", () => {
  const unSelectUser = jest.fn();

  const wrapper = shallow(
    <CallerDialpad
      updateDialpadValue={() => {}}
      dialpadValue={""}
      phoneService={{}}
      unSelectUser={unSelectUser}
    />
  );

  expect(wrapper.debug()).toContain("<Segment");
  expect(wrapper.debug()).toContain("<Dialpad");
  expect(wrapper.debug()).toContain("<CallButton");
});

it("triggers makeCall", () => {
  const unSelectUser = jest.fn();
  const makeCall = jest.fn();
  const updateDialpad = jest.fn();

  const phoneService = {
    makeCall: makeCall,
    updateDialpadValue: updateDialpad
  };

  const wrapper = shallow(
    <CallerDialpad
      updateDialpadValue={() => {}}
      dialpadValue={""}
      phoneService={phoneService}
      unSelectUser={unSelectUser}
    />
  );

  wrapper.instance().makeCall();
  expect(unSelectUser).toHaveBeenCalled();
  expect(makeCall).toHaveBeenCalled();
});


it("triggers handleDialPadButtonClick", () => {
  const unSelectUser = jest.fn();
  const makeCall = jest.fn();
  const updateDialpad = jest.fn();

  const phoneService = {
    makeCall: makeCall,
  };

  const wrapper = shallow(
    <CallerDialpad
      updateDialpadValue={updateDialpad}
      dialpadValue={""}
      phoneService={phoneService}
      unSelectUser={unSelectUser}
    />
  );

  wrapper.instance().handleDialPadButtonClick();
  expect(updateDialpad).toHaveBeenCalled();
});