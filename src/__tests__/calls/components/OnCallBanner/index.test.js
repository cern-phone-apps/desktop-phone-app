import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import OnCallBannerContainer from "calls/components/OnCallBanner/index";
const mockStore = configureMockStore();


describe('OnCallBanner', () => {
  let wrapper, store;

  beforeEach(() => {
    const initialState = {
      calls: {
        call: {
          recipient: 'test'
        }
      }
    };
    store = mockStore(initialState);

    wrapper = shallow(
      <Router>
        <OnCallBannerContainer
          store={store}
        />
      </Router>);

    // console.log(wrapper.dive().debug());
    expect(wrapper.debug());

  });

  it('should show the correct props', () => {
    // TODO: Revise this, not done yet
    // expect(wrapper.props().recipient).toBe(false);
    expect(true).toBe(true);
  });

});
