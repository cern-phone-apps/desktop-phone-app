import { shallow } from "enzyme";
import React from "react";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import { logMessage } from "common/utils/logs";
import { UserSearchForm } from "calls/components/search/UserSearchForm/UserSearchForm";

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
    }
  };

  beforeEach(() => {
    store = mockStore(storeContent);
    store.dispatch = jest.fn();
    wrapper = shallow(<UserSearchForm store={store} />);
  });

  it("maps state and dispatch to props", () => {
    logMessage(wrapper);
    // expect(wrapper.props()).toContain(
    //   expect.objectContaining({
    //     userSelected: expect.any(Boolean),
    //   })
    // );
  });
});
