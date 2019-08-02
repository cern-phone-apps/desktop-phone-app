import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import ContactsListContainer from "calls/components/contacts/ContactsList/ContactListContainer";
const mockStore = configureMockStore();

describe("ContactsListContainer tests", () => {
  let wrapper, store;

  beforeEach(() => {
    const initialState = {
      calls: {
        contacts: {
          getContacts: {
            contacts: ["contactTest"]
          }
        }
      }
    };

    store = mockStore(initialState);

    wrapper = shallow(<ContactsListContainer store={store} />);
  });

  it("should show the correct props", () => {
    expect(wrapper.props().contacts).toEqual(["contactTest"]);
  });
});
