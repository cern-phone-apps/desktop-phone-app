import React from "react";
import { shallow } from "enzyme";
import configureMockStore from 'redux-mock-store';
import DisconnectAndLogoutButtonContainer from "calls/components/DisconnectAndLogoutButton/index";
import DisconnectAndLogoutButton
  from "../../../../calls/components/DisconnectAndLogoutButton/DisconnectAndLogoutButton";
const mockStore = configureMockStore();


describe('DisconnectAndLogoutButton', () => {
  let wrapper, store, disconnectButtonWrapper;
  let phoneService = {test: true};

  beforeEach(() => {
    const initialState = {
      calls: {
        connection: {
          connected: true,
          disconnecting: false
        }
      }
    };

    store = mockStore(initialState);
    const context = { phoneService: phoneService };

    wrapper = shallow(
      <DisconnectAndLogoutButtonContainer store={store} phoneService={phoneService} displayMessage={false} />, { context });

    disconnectButtonWrapper = wrapper.shallow().shallow();


  });


  it('should show the correct props', () => {
    expect(disconnectButtonWrapper.prop('disconnecting')).toBe(false);
  });


});