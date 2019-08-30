import configureMockStore from "redux-mock-store";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as actions from "calls/actions/status";

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares);

describe("status actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("should create an action to set user available", () => {
    const body = { doNotDisturb: true };
    fetchMock.putOnce(`http://localhost:7075/api/v1/users/me/`, {
      body: body,
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: actions.SET_DO_NOT_DISTURB_REQUEST },
      {
        type: actions.SET_DO_NOT_DISTURB_SUCCESS,
        payload: body,
        meta: undefined
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.setUserDoNotDisturb(true)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });

    // expect(actions.setUserDoNotDisturb(true)).toEqual(expectedAction);
  });
});
