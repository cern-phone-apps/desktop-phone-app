import { shallow } from "enzyme";
import React from "react";

import { DtmfDialpadForm } from "calls/components/dialpads/DtmfDialpadForm/DtmfDialpadForm";

it("renders DtmfDialpadForm without crashing", () => {
  const wrapper = shallow(<DtmfDialpadForm phoneService={{}} />);
});

it("contains expected texts", () => {
  const wrapper = shallow(<DtmfDialpadForm phoneService={{}} />);

  expect(wrapper.text()).toEqual("<Grid />");
});

it("contains expected strings", () => {
  const wrapper = shallow(<DtmfDialpadForm phoneService={{}} />);

  expect(wrapper.debug()).toContain("<Grid");
  expect(wrapper.debug()).toContain("<DtmfDialpad");
  expect(wrapper.debug()).toContain("Input a dtmf command...");
});

it("triggers sendDtmfCommand", () => {
  const sendDtmfCommand = jest.fn();
  const phoneService = {
    sendDtmfCommand: sendDtmfCommand
  };
  const wrapper = shallow(<DtmfDialpadForm phoneService={phoneService} />);

  wrapper.instance().sendDtmf();
  expect(sendDtmfCommand).toHaveBeenCalled();
});

it("triggers handleDialPadButtonClick", () => {
  const sendDtmfCommand = jest.fn();
  const phoneService = {
    sendDtmfCommand: sendDtmfCommand
  };
  const wrapper = shallow(<DtmfDialpadForm phoneService={phoneService} />);

  wrapper.instance().handleDialPadButtonClick('1');
  expect(wrapper.instance().state.dialpadValue).toBe('1');
});
