import React from "react";
import Contact from "calls/components/Contact/Contact";
import PropTypes from "prop-types";

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
    const selectContact = jest.fn();

    const wrapper = shallow(
      <Contact contact={contact} selectContact={selectContact} />
    );

    expect(wrapper.text()).toEqual("<Item />");
  });

  it("runs the correct function on click", () => {

    const contact = {
      displayName: "John",
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT",
      cernGroup: "CDA",
      cernSection: "IC"
    };
    const selectContact = jest.fn();

    const wrapper = shallow(
      <Contact contact={contact} selectContact={selectContact} />
    );


    const div = wrapper.find("Item").first();
    div.simulate('click');
    expect(selectContact).toHaveBeenCalled();
  });


});
