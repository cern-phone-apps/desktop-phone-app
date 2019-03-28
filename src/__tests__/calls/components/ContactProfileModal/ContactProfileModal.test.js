import React from "react";
import ContactProfileModal from "calls/components/ContactProfileModal/ContactProfileModal";


describe("Contact component", () => {


  it("renders without crashing", done => {
    const selectedContact = {
      displayName: "John",
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC",
      physicalDeliveryOfficeName: 'MM',
      mail: 'john.one@cern.ch',
      phones: [
        {
          number: "98765",
          phoneType: "IP"
        },
        {
          number: "123456",
          phoneType: "IP",
        }]
    };
    const modalOpen = true;
    const unSelectContact = jest.fn();
    const getUserProfileById = jest.fn( () => {
      const mockReturn = {
        payload: {
          result: selectedContact
        }
      };

      return mockReturn;
    });


    const wrapper = shallow(
      <ContactProfileModal selectedContact={selectedContact} modalOpen={modalOpen} unSelectContact={unSelectContact} getUserProfileById={getUserProfileById}  />
    );


    wrapper.setState({ fetching: false }, () => {

      wrapper.update();

      setTimeout(()=>{

        expect(wrapper.text()).toEqual("<Modal />");
        done();
      }, 350);
    });

  });

  it("renders without crashing when phone number is not present", done => {
    const selectedContact = {
      displayName: "John",
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC",
      physicalDeliveryOfficeName: 'MM',
      mail: 'john.one@cern.ch',
      phones: [
        {
          number: null,
          phoneType: "IP"
        },
        {
          number: null,
          phoneType: "IP",
        }]
    };
    const modalOpen = true;
    const unSelectContact = jest.fn();
    const getUserProfileById = jest.fn( () => {
      const mockReturn = {
        payload: {
          result: selectedContact
        }
      };

      return mockReturn;
    });


    const wrapper = shallow(
      <ContactProfileModal selectedContact={selectedContact} modalOpen={modalOpen} unSelectContact={unSelectContact} getUserProfileById={getUserProfileById}  />
    );

    wrapper.setState({ fetching: false }, () => {

      wrapper.update();

      setTimeout(()=>{
        expect(wrapper.text()).toEqual("<Modal />");
        done();
      }, 350);
    });

  });


  it("handles close button", done => {
    const selectedContact = {
      displayName: "John",
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC",
      physicalDeliveryOfficeName: 'MM',
      mail: 'john.one@cern.ch',
      phones: [
        {
          number: "98765",
          phoneType: "IP"
        },
        {
          number: "98765",
          phoneType: "IP",
        }]
    };
    const modalOpen = true;
    const unSelectContact = jest.fn();
    const getUserProfileById = jest.fn( () => {
      const mockReturn = {
        payload: {
          result: selectedContact
        }
      };

      return mockReturn;
    });


    const wrapper = shallow(
      <ContactProfileModal selectedContact={selectedContact} modalOpen={modalOpen} unSelectContact={unSelectContact} getUserProfileById={getUserProfileById}  />
    );

    wrapper.setState({ fetching: false }, () => {

      wrapper.update();

      wrapper.instance().handleClose();

      setTimeout(()=>{

        expect( unSelectContact ).toHaveBeenCalled();
        done();
      }, 350);
    });

  });


  it("renders without crashing when modal closed", done => {

    const selectedContact = {
      displayName: "John",
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC",
      physicalDeliveryOfficeName: 'MM',
      mail: 'john.one@cern.ch',
      phones: [
        {
          number: "98765",
          phoneType: "IP"
        },
        {
          number: "98765",
          phoneType: "IP",
        }]
    };
    const modalOpen = false;
    const unSelectContact = jest.fn();
    const getUserProfileById = jest.fn();


    const wrapper = shallow(
      <ContactProfileModal selectedContact={selectedContact} modalOpen={modalOpen} unSelectContact={unSelectContact} getUserProfileById={getUserProfileById}  />
    );

    wrapper.setState({ fetching: false }, () => {

      wrapper.update();

      setTimeout(()=>{
        expect(wrapper.text()).toEqual("<Modal />");
        done();
      }, 350);
    });

  });

  it("renders without crashing when modal is open but there are not results", done => {

    const selectedContact = {};
    const modalOpen = true;
    const unSelectContact = jest.fn();
    const getUserProfileById = jest.fn();


    const wrapper = shallow(
      <ContactProfileModal selectedContact={selectedContact} modalOpen={modalOpen} unSelectContact={unSelectContact} getUserProfileById={getUserProfileById}  />
    );

    wrapper.setState({ fetching: false }, () => {

      wrapper.update();
      setTimeout(()=>{
        expect(wrapper.text()).toEqual("<Modal />");
        done();
      }, 350);
    });

  });

  it("renders without crashing when there is not selected contact", () => {

    const modalOpen = true;
    const unSelectContact = jest.fn();
    const getUserProfileById = jest.fn();


    const wrapper = shallow(
      <ContactProfileModal modalOpen={modalOpen} unSelectContact={unSelectContact} getUserProfileById={getUserProfileById}  />
    );


    expect(wrapper.text()).toEqual("<Modal />");


  });

});
