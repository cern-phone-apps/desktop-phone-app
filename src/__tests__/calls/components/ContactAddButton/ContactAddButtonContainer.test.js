import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import ContactAddButtonContainer from "calls/components/ContactAddButton/ContactAddButtonContainer";
const mockStore = configureMockStore();

describe("ContactAddButtonContainer", () => {
  let wrapper, store;

  const contactTest = {
    displayName: "John",
    firstName: "John",
    lastName: "One",
    personId: "123456",
    division: "IT",
    cernGroup: "CDA",
    cernSection: "IC"
  };

  const contactsList = [
    {
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT"
    },
    {
      firstName: "John",
      lastName: "Does",
      personId: "234567",
      division: "IT",
      cernGroup: "CDA"
    },
    {
      firstName: "Ron",
      lastName: "Troes",
      personId: "345689",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC"
    }
  ];

  beforeEach(() => {
    const initialState = {
      calls: {
        contacts: {
          getContacts: {
            contacts: contactsList
          }
        }
      }
    };

    store = mockStore(initialState);

    wrapper = shallow(
      <ContactAddButtonContainer store={store} contact={contactTest} />
    );
  });

  it("should show the correct props", () => {
    expect(wrapper.props().contacts).toEqual(contactsList);
    // expect(wrapper.props().contact).toEqual(contactTest);

    // expect(wrapper.props()).toEqual(
    //   expect.objectContaining(contactsList)
    // );
  });
});
