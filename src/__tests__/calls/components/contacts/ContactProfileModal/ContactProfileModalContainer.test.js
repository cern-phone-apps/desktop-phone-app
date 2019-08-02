import React from "react";
import { shallow } from "enzyme";
import configureMockStore from 'redux-mock-store';
import ContactProfileModalContainer from "calls/components/contacts/ContactProfileModal/ContactProfileModalContainer";
const mockStore = configureMockStore();


describe('ContactProfileModalContainer', () => {

  let wrapper, store;

  const contact = {
    displayName: "John",
    firstName: "John",
    lastName: "One",
    personId: "123456",
    division: "IT",
    cernGroup: "CDA",
    cernSection: "IC"
  };

  beforeEach(() => {
    const initialState = {
      calls: {
        contacts: {
          modal: {
            selectedContact: contact,
            modalOpen: true
          },
        },
      }
    };

    store = mockStore(initialState);

    wrapper = shallow(
      <ContactProfileModalContainer store={store} />
    );

  });


  it('should show the correct props', () => {

    expect( wrapper.props().selectedContact ).toEqual(  contact  );
    expect( wrapper.props().modalOpen ).toEqual(  true  );

  });


});