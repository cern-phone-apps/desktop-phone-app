import { shallow } from "enzyme";
import React from "react";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import CalleeProfileContainer from "calls/components/CalleeProfile/CalleeProfileContainer";

const history = createHistory();
const middlewares = [thunk, routerMiddleware(history)];
const mockStore = configureMockStore(middlewares);

describe("CalleeProfile Container", () => {
  let wrapper, store;

  let storeContent = {
    calls: {
      search: {
        user: {
          username: "example"
        }
      },
      call: {
        calling: false
      },
      profile: {
        profile: {},
        fetching: false
      }
    }
  };

  beforeEach(() => {
    store = mockStore(storeContent);
    store.dispatch = jest.fn();
    wrapper = shallow(<CalleeProfileContainer store={store} />);
  });

  it("maps state and dispatch to props", () => {
    // expect(1).toEqual(1)
    expect(wrapper.props()).toEqual(
      expect.objectContaining({
        username: "example",
        fetching: false,
        profile: {}
      })
    );
  });
});
