import { shallow } from "enzyme";
import React from "react";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "connected-react-router";
import { LogoutButtonContainer } from "auth/components/LogoutButton/LogoutButtonContainer";

const history = createHistory();
const middlewares = [thunk, routerMiddleware(history)];
const mockStore = configureMockStore(middlewares);

jest.mock("react-router-dom");

describe("LogoutButton Container", () => {
  let wrapper, store;

  let storeContent = {
    auth: {
      loggedIn: false,
      loginInProgress: false,
      errors: {}
    },
    router: {
      location: {
        pathname: "/",
        search: "",
        hash: ""
      }
    }
  };

  beforeEach(() => {
    store = mockStore(storeContent);
    store.dispatch = jest.fn();
    wrapper = shallow(<LogoutButtonContainer t={key => key} store={store} />);
  });

  it("maps state and dispatch to props", () => {
    expect(wrapper.props()).toEqual(
      expect.objectContaining({
        logout: expect.any(Function)
      })
    );
  });

  it("maps onIncrement to dispatch increment action", () => {
    wrapper.props().logout();
    const expected = {
      "@@redux-api-middleware/RSAA": {
        credentials: "include",
        endpoint: "http://localhost:7075/auth/v1/logout/",
        headers: expect.any(Function),
        method: "DELETE",
        types: [
          "@@auth/LOGOUT_REQUEST",
          "@@auth/LOGOUT_SUCCESS",
          "@@auth/LOGOUT_FAILURE"
        ]
      }
    };
    expect(store.dispatch).toHaveBeenCalledWith(expected);
  });
});
