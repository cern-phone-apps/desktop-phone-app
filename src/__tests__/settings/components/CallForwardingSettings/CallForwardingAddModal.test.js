import React from "react";
import { CallForwardingAddModal } from "settings/components/CallForwardingSettings/CallForwardingAddModal/CallForwardingAddModal";

describe("CallForwardingAddModal component", () => {
  it("renders without crashing", () => {
    const addNumber = jest.fn();
    const searchUsers = jest.fn();
    const selectExistingNumber = jest.fn();

    const wrapper = shallow(
      <CallForwardingAddModal
        addLocalForwardNumber={addNumber}
        searchUsers={searchUsers}
        me={{}}
        selectExistingNumber={selectExistingNumber}
      />
    );

    expect(wrapper.text()).toEqual("<Modal />");
    expect(wrapper.debug()).toContain("Add a new number");
    expect(wrapper.debug()).toContain("Phone number");
  });

  it("triggers open and close", () => {
    const addNumber = jest.fn();
    const searchUsers = jest.fn();
    const selectExistingNumber = jest.fn();

    const wrapper = shallow(
      <CallForwardingAddModal
        addLocalForwardNumber={addNumber}
        localForwardList={[]}
        status={{}}
        me={{}}
        searchUsers={searchUsers}
        selectExistingNumber={selectExistingNumber}
      />
    );

    wrapper.instance().handleOpen();
    expect(wrapper.state().modalOpen).toEqual(true);
    expect(wrapper.instance().handleClose());
    expect(wrapper.state().modalOpen).toEqual(false);
  });

  it("triggers add select number", () => {
    const addNumber = jest.fn();
    const searchUsers = jest.fn();
    const selectExistingNumber = jest.fn();

    const wrapper = shallow(
      <CallForwardingAddModal
        addLocalForwardNumber={addNumber}
        localForwardList={[]}
        status={{
          "destination-list": []
        }}
        me={{}}
        searchUsers={searchUsers}
        selectExistingNumber={selectExistingNumber}
      />
    );

    wrapper.state().value = "12345";
    expect(wrapper.state().value).toEqual("12345");
    wrapper.instance().addSelectedNumber();
    expect(addNumber).toHaveBeenCalled();
  });
});
