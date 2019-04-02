import { shallow } from "enzyme";
import React from "react";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import { logMessage } from "common/utils/logs";
import UserSearchContainer from "calls/components/search/UserSearch/UserSearchContainer";

const history = createHistory();
const middlewares = [thunk, routerMiddleware(history)];
const mockStore = configureMockStore(middlewares);

describe("UserSearch Container", () => {
  let wrapper, store;

  let storeContent = {
    calls: {
      call: {
        onCall: false,
        calling: false
      },
      search: {
        userSelected: false
      },
      dialpad: {
        display: false,
        value: ""
      }
    }
  };

  beforeEach(() => {
    store = mockStore(storeContent);
    store.dispatch = jest.fn();
    wrapper = shallow(<UserSearchContainer store={store} />);
  });

  it("maps state and dispatch to props", () => {
    logMessage(wrapper);
    expect(wrapper.props()).toEqual(
      expect.objectContaining({
        userSelected: expect.any(Boolean),
        unSelectUser: expect.any(Function),
        calling: expect.any(Boolean),
        onCall: expect.any(Boolean),
        displayDialpad: expect.any(Boolean)
      })
    );
  });
});
