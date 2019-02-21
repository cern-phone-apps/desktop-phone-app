import React from "react";
import { shallow } from "enzyme";
import {mount} from 'enzyme';
import { DialButton } from "calls/components/dialpads/Dialpad/DialButton";
import Dialpad from "calls/components/dialpads/Dialpad/Dialpad";

it("renders Dialpad without crashing", () => {
  const dialpad = shallow(
    <Dialpad
      updateDialpadValue={() => {}}
      dialpadValue={""}
      makeCall={() => {}}
    />
  );

  expect(dialpad.text()).toEqual("<Grid />");
});

it("Dialpad contains 10 numbers", () => {
  const dialpad = shallow(
    <Dialpad
      updateDialpadValue={() => {}}
      dialpadValue={""}
      makeCall={() => {}}
    />
  );

  expect(dialpad.html()).toContain("1");
  expect(dialpad.html()).toContain("2");
  expect(dialpad.html()).toContain("3");
  expect(dialpad.html()).toContain("4");
  expect(dialpad.html()).toContain("5");
  expect(dialpad.html()).toContain("6");
  expect(dialpad.html()).toContain("7");
  expect(dialpad.html()).toContain("8");
  expect(dialpad.html()).toContain("9");
  expect(dialpad.html()).toContain("0");
});


it("renders DialButton without crashing", () => {
  const button = shallow(
    <DialButton
      clickHandler={() => {}}
      longPressHandler={() => {}}
      symbol={"7"}
      alt={"+"}
    />
  );
});

it("handles DialButton short press", () => {
  const onClick = jest.fn();
  const longPress = jest.fn();

  const wrapper = shallow(
    <DialButton
      clickHandler={onClick}
      longPressHandler={longPress}
      symbol={"7"}
      longPressTimeout={1000}
    />
  );
  const div = wrapper.find(".DialButton");

  div.simulate("mousedown");
  div.simulate("mouseup");
  expect(onClick).toHaveBeenCalled();
});

it("handles DialButton long press", done  => {
  const onClick = jest.fn();
  const longPress = jest.fn();

  const button = shallow(
    <DialButton
      clickHandler={onClick}
      longPressHandler={longPress}
      symbol={"7"}
      longPressTimeout={1000}
      alt={"*"}
    />
  );

  const div = button.find(".DialButton");
  div.simulate("mousedown");
  setTimeout(() => {
    div.simulate("mouseup");
    expect(longPress).toHaveBeenCalled();
    done();
  }, 2000);
});

it("Dialpad click handler works", () => {

  const onClick = jest.fn();

  const dialpad = mount(
    <Dialpad
      handleButtonClick={onClick}
    />
  );

  const div = dialpad.find(".DialButton").first();

  div.simulate("mousedown");
  div.simulate("mouseup");
  expect(onClick).toHaveBeenCalled();
});

it("Dialpad click handler works", done  => {

  const longPress = jest.fn();

  const dialpad = mount(
    <Dialpad
      handleButtonClick={longPress}
    />
  );

  const div = dialpad.find(".DialButton").at(10);
  div.simulate("mousedown");
  setTimeout(() => {
    div.simulate("mouseup");
    expect(longPress).toHaveBeenCalled();
    done();
  }, 2000);
});