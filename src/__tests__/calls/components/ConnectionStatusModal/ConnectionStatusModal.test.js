import { shallow } from "enzyme/build";
import {mount} from 'enzyme';
import React from "react";
import ConnectionStatusModal from "calls/components/ConnectionStatusModal/ConnectionStatusModal";
import { actionMessage } from "common/utils/logs";

describe("Connection Status Modal Tests", () => {
  it("renders ConnectionStatusModal without crashing", () => {
    const wrapper = shallow(
      <ConnectionStatusModal
       connected/>
    );

    expect(wrapper.text()).toEqual("<Modal />");
  });

  it("contains Texts when connected", () => {
    const wrapper = shallow(
      <ConnectionStatusModal
        connected/>
    );

    expect(wrapper.debug()).toContain("ModalContent");
    expect(wrapper.debug()).toContain("Your connection status");
    expect(wrapper.debug()).toContain("You are connected");
  });

  it("contains Texts when not connected", () => {
    const wrapper = shallow(
      <ConnectionStatusModal
        connected={false}/>
    );

    expect(wrapper.debug()).toContain("ModalContent");
    expect(wrapper.debug()).toContain("Your connection status");
    expect(wrapper.debug()).toContain("You are not connected");
  });

  it("contains a styled button", () => {
    const wrapper = mount( <ConnectionStatusModal connected={true}/> );

    expect(wrapper.debug()).toContain('Button');
  });

  it("should log user action", () => {

    let wrapper = shallow( <ConnectionStatusModal connected={true}/> );
    expect( wrapper.instance().logUserAction()).toEqual(undefined);

  });

});