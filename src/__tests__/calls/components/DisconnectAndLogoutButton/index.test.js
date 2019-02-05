import React from "react";
import { shallow } from "enzyme";
import configureMockStore from 'redux-mock-store';
import DisconnectAndLogoutButtonContainer from "calls/components/DisconnectAndLogoutButton/index";
import PropTypes from "prop-types";
import DisconnectAndLogoutButton
  from "../../../../calls/components/DisconnectAndLogoutButton/DisconnectAndLogoutButton";
const mockStore = configureMockStore();


describe('DisconnectAndLogoutButton', () => {
  let wrapper, store, store2;
  let phoneService = {test: true};
  const logout = jest.fn();

  beforeEach(() => {
    const initialState = {
      calls: {
        connection: {
          connected: true,
          disconnecting: false
        }
      }
    };

    const initialState2 = {
      phoneService: {test: true},
      disconnecting: false,
      connected: true,
      displayMessage: false,
      logout: logout
    };

    store = mockStore(initialState);
    store2 = mockStore(initialState2);

    wrapper = shallow(
      <DisconnectAndLogoutButtonContainer store={store} phoneService={phoneService} />
    ).dive(store2);

    wrapper.setProps({phoneService: phoneService});
    // console.log('props: ' + wrapper.props().phoneService  );

  });


  it('should show the correct props', () => {

    // TODO: Revise this, not done yet
    expect(true).toBe(true);
    // expect(wrapper.dive().props().disconnecting).toBe(false);
  });


});