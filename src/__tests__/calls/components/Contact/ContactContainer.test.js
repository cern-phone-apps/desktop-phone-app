import React from "react";
import { shallow } from "enzyme";
import configureMockStore from 'redux-mock-store';
import ContactContainer from "calls/components/Contact/ContactContainer";
const mockStore = configureMockStore();


describe('ContactContainer', () => {

  let wrapper, store;

  const selectContactFn = jest.fn();
  const contactTest = {
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
      selectContact: selectContactFn,
      calls: {
        contacts: {
          contact: contactTest
        }
      }
    };

    store = mockStore(initialState);

    wrapper = shallow(
      <ContactContainer store={store} />
    );

  });


  it('should show the correct props', () => {

    console.log( wrapper.props() );

    expect( wrapper.props().contact ).toEqual(  contactTest  );

  });


});