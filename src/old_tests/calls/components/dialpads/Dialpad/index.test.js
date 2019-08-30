import React from "react";
import { shallow } from "enzyme";
import configureMockStore from 'redux-mock-store';
import DialpadContainer from "calls/components/dialpads/Dialpad/index";
const mockStore = configureMockStore();


describe('Dialpad', () => {
  let wrapper, store;

  beforeEach(() => {
    const initialState = {
      calls: {
        dialpad: {
          value: '1'
        }
      }
    };

    store = mockStore(initialState);

    wrapper = shallow(
      <DialpadContainer store={store} />
    );

  });


  it('should show the correct props', () => {
    expect(wrapper.props().dialpadValue).toBe('1');
  });


});