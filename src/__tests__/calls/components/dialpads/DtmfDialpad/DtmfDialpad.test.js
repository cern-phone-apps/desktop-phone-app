import React from "react";
import { shallow } from "enzyme";
import { DtmfDialpad } from "calls/components/dialpads/DtmfDialpad/DtmfDialpad";

it("renders DtmfDialpad without crashing", () => {
  const sendDtmf = jest.fn();
  const buttonClick = jest.fn();

  const wrapper = shallow(
    <DtmfDialpad onButtonClick={buttonClick} sendDtmfClick={sendDtmf} />
  );

  expect(wrapper.text()).toEqual("<Segment />");
});

it("contains expected texts", () => {
  const sendDtmf = jest.fn();
  const buttonClick = jest.fn();

  const wrapper = shallow(
    <DtmfDialpad
      phoneService={{}}
      onButtonClick={buttonClick}
      sendDtmfClick={sendDtmf}
    />
  );

  expect(wrapper.debug()).toContain("<Segment");
  expect(wrapper.debug()).toContain("<CallButton");
  expect(wrapper.debug()).toContain("Dialpad");
});


it("prints dtmf custom row text", () => {
  const sendDtmf = jest.fn();
  const buttonClick = jest.fn();

  const wrapper = shallow(
    <DtmfDialpad
      phoneService={{}}
      onButtonClick={buttonClick}
      sendDtmfClick={sendDtmf}
    />
  );
  let dtmfRow = shallow(wrapper.instance().printDtmfRow());
  expect(dtmfRow.text()).toContain("GridColumn");
});


it("prints dtmf custom row string", () => {
  const sendDtmf = jest.fn();
  const buttonClick = jest.fn();

  const wrapper = shallow(
    <DtmfDialpad
      phoneService={{}}
      onButtonClick={buttonClick}
      sendDtmfClick={sendDtmf}
    />
  );
  let dtmfRow = shallow(wrapper.instance().printDtmfRow());
  expect(dtmfRow.debug()).toContain("row");
  expect(dtmfRow.debug()).toContain("GridColumn");
  expect(dtmfRow.debug()).toContain("CallButton");
});
