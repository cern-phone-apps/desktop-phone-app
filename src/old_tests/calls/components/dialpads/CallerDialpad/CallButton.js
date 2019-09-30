import React from "react";
import { shallow } from "enzyme";
import { Icon } from "semantic-ui-react";
import { CallButton } from "calls/components/CallButton/CallButton";


it("renders CallButton without crashing", () => {
  const wrapper = shallow(
    <CallButton clickHandler={() => {}} text={<Icon name={"phone"} />} />
  );
});

it("contains expected texts", () => {
  const wrapper = shallow(
    <CallButton clickHandler={() => {}} text={<Icon name={"phone"} />} />
  );

  expect(wrapper.debug()).toContain("DialButton");
  expect(wrapper.debug()).toContain("CallButton");
});

it("triggers clickHandler method", () => {
  const clickHandler = jest.fn();
  const wrapper = shallow(
    <CallButton clickHandler={clickHandler} text={<Icon name={"phone"} />} />
  );

  const div = wrapper.find(".CallButton");
  div.simulate("click");
  expect(clickHandler).toHaveBeenCalled();

});