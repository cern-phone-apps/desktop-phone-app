import React from "react";
import ContactsList from "calls/components/contacts/ContactsList/ContactList";


describe("ContactList component", () => {

  it("renders without crashing", () => {

    const contacts = [
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
      }];

    const getUserContacts = jest.fn();

    const wrapper = shallow(
      <ContactsList contacts={contacts} getUserContacts={getUserContacts}  />
    );

    expect(wrapper.text()).toEqual("<ScrollableContent />");


  });

  it("renders without crashing when contacts null", () => {

    const contacts = null;

    const getUserContacts = jest.fn();

    const wrapper = shallow(
      <ContactsList contacts={contacts} getUserContacts={getUserContacts}  />
    );

    expect(wrapper.text()).toEqual("<ScrollableContent />");


  });

});
