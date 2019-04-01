import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import ConnectionStatusModalContainer from "calls/components/ConnectionStatusModal/ConnectionStatusModalContainer";
const mockStore = configureMockStore();

describe("ConnectionStatusModal", () => {
  let wrapper, store;

  beforeEach(() => {
    const initialState = {
      calls: {
        connection: {
          connected: true
        },
        numbers: {
          activeNumber: "123"
        },
        status: {
          doNotDisturb: false
        }
      }
    };

    store = mockStore(initialState);

    wrapper = shallow(<ConnectionStatusModalContainer store={store} />).dive();
  });

  it("should show the correct props", () => {
    expect(wrapper.dive().props().activeNumber).toBe("123");
    expect(wrapper.dive().props().connected).toBe(true);
  });
});
