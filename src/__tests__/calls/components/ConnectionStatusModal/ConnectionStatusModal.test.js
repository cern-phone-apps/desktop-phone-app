import { shallow } from "enzyme/build";
import { mount } from "enzyme";
import React from "react";
import ConnectionStatusModal from "calls/components/ConnectionStatusModal/ConnectionStatusModal";
import { actionMessage } from "common/utils/logs";

describe("Connection Status Modal Tests", () => {
  it("renders ConnectionStatusModal without crashing", () => {
    const asyncMock = jest.fn().mockResolvedValue({payload: {doNotDisturb: false}}); //result.payload.doNotDisturb
    const asyncSetDoNotDisturb = jest.fn().mockResolvedValue({payload: {doNotDisturb: false}});
    const wrapper = shallow(
      <ConnectionStatusModal
        connected
        doNotDisturb={false}
        getMe={asyncMock}
        setUserDoNotDisturb={asyncSetDoNotDisturb}
      />
    );

    expect(wrapper.text()).toEqual("<Modal />");
  });

  it("contains Texts when connected", () => {

    const asyncMock = jest.fn().mockResolvedValue({payload: {doNotDisturb: false}}); //result.payload.doNotDisturb
    const asyncSetDoNotDisturb = jest.fn().mockResolvedValue({payload: {doNotDisturb: false}});

    const wrapper = shallow(
      <ConnectionStatusModal
        connected
        doNotDisturb={false}
        getMe={asyncMock}
        setUserDoNotDisturb={asyncSetDoNotDisturb}
      />
    );

    expect(wrapper.debug()).toContain("ModalContent");
    expect(wrapper.debug()).toContain("Your connection status");
    expect(wrapper.debug()).toContain("You are connected");
  });

  it("contains Texts when not connected", () => {
    const asyncMock = jest.fn().mockResolvedValue({payload: {doNotDisturb: false}}); //result.payload.doNotDisturb
    const asyncSetDoNotDisturb = jest.fn().mockResolvedValue({payload: {doNotDisturb: false}});

    const wrapper = shallow(
      <ConnectionStatusModal
        connected={false}
        doNotDisturb={false}
        getMe={asyncMock}
        setUserDoNotDisturb={asyncSetDoNotDisturb}
      />
    );

    expect(wrapper.debug()).toContain("ModalContent");
    expect(wrapper.debug()).toContain("Your connection status");
    expect(wrapper.debug()).toContain("You are not connected");
  });

  it("contains a styled button", () => {
    const asyncMock = jest.fn().mockResolvedValue({payload: {doNotDisturb: false}}); //result.payload.doNotDisturb
    const asyncSetDoNotDisturb = jest.fn().mockResolvedValue({payload: {doNotDisturb: false}});

    const wrapper = mount(
      <ConnectionStatusModal
        connected={true}
        doNotDisturb={false}
        getMe={asyncMock}
        setUserDoNotDisturb={asyncSetDoNotDisturb}
      />
    );

    expect(wrapper.debug()).toContain("Button");
  });

  test('should log user action', async () => {
    const asyncMock = jest.fn().mockResolvedValue({payload: {doNotDisturb: false}}); //result.payload.doNotDisturb
    const asyncSetDoNotDisturb = jest.fn().mockResolvedValue({payload: {doNotDisturb: false}});

    let wrapper = shallow(
      <ConnectionStatusModal
        connected={true}
        doNotDisturb={false}
        getMe={asyncMock}
        setUserDoNotDisturb={asyncSetDoNotDisturb}
      />
    );
    expect(wrapper.instance().logUserAction()).toEqual(undefined);
  });

//   it("should log user action", () => {
//     const getMe = jest.fn();
//     const setUserDoNotDisturb = jest.fn();
//
//     let wrapper = shallow(
//       <ConnectionStatusModal
//         connected={true}
//         doNotDisturb={false}
//         getMe={getMe}
//         setUserDoNotDisturb={setUserDoNotDisturb}
//       />
//     );
//     expect(wrapper.instance().logUserAction()).toEqual(undefined);
//   });
});
