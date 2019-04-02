import React from "react";
import ContactAddButton from "calls/components/contacts/ContactAddButton/ContactAddButton";

describe("Contact component", () => {


  it("renders without crashing", () => {
    const contact = {
      displayName: "John",
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC"
    };

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

    const addUserContact = jest.fn();
    const removeUserContact = jest.fn();
    const getUserContacts = jest.fn( () => {
      const mockReturn = {
        payload: {
          result: contacts
        }
      };

      return mockReturn;
    });

    const wrapper = shallow(
      <ContactAddButton contact={contact} contacts={contacts} addUserContact={addUserContact} removeUserContact={removeUserContact} getUserContacts={getUserContacts}  />
    );
    expect(wrapper.text()).toEqual("<Icon />");
  });


  it("renders without crashing when doesn't contain contacts", () => {
    const contact = {
      displayName: "John",
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC"
    };

    const contacts = [];

    const addUserContact = jest.fn();
    const removeUserContact = jest.fn();
    const getUserContacts = jest.fn();

    const wrapper = shallow(
      <ContactAddButton contact={contact} contacts={contacts} addUserContact={addUserContact} removeUserContact={removeUserContact} getUserContacts={getUserContacts}  />
    );
    expect(wrapper.text()).toEqual("<Icon />");
  });

  it("renders without crashing when doesn't contain contacts and getUserContacts returns data", () => {
    const contact = {
      displayName: "John",
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC"
    };

    const contacts = [];

    const addUserContact = jest.fn();
    const removeUserContact = jest.fn();
    const getUserContacts = jest.fn( () => {
      const mockReturn = {
        payload: {
          result: contacts
        }
      };

      return mockReturn;
    });

    const wrapper = shallow(
      <ContactAddButton contact={contact} contacts={contacts} addUserContact={addUserContact} removeUserContact={removeUserContact} getUserContacts={getUserContacts}  />
    );
    expect(wrapper.text()).toEqual("<Icon />");
  });

  it("renders without crashing when loading and hasContact are false", done => {
    const contact = {
      displayName: "John",
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC"
    };

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

    const addUserContact = jest.fn();
    const removeUserContact = jest.fn();
    const getUserContacts = jest.fn( () => {
      const mockReturn = {
        payload: {
          result: contacts
        }
      };

      return mockReturn;
    });

    const wrapper = shallow(
      <ContactAddButton contact={contact} contacts={contacts} addUserContact={addUserContact} removeUserContact={removeUserContact} getUserContacts={getUserContacts}  />
    );



    wrapper.setState({ loading: false }, () => {

      wrapper.update();

      const div = wrapper.find("Icon").first();
      div.simulate('click');

      setTimeout(()=>{
        expect(addUserContact).toHaveBeenCalled();
        expect(wrapper.text()).toEqual("<Icon />");
        done();
      }, 350);
    });

  });


  it("renders without crashing when loading is false and hasContact true", done => {
    const contact = {
      displayName: "John",
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC"
    };

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

    const addUserContact = jest.fn();
    const removeUserContact = jest.fn();
    const getUserContacts = jest.fn( () => {
      const mockReturn = {
        payload: {
          result: contacts
        }
      };

      return mockReturn;
    });

    const wrapper = shallow(
      <ContactAddButton contact={contact} contacts={contacts} addUserContact={addUserContact} removeUserContact={removeUserContact} getUserContacts={getUserContacts}  />
    );



    wrapper.setState({ loading: false, hasContact: true  }, () => {

      wrapper.update();

      const div = wrapper.find("Icon").first();
      div.simulate('click');

      setTimeout(()=>{
        expect(removeUserContact).toHaveBeenCalled();
        expect(wrapper.text()).toEqual("<Icon />");
        done();
      }, 350);
    });

  });


});
