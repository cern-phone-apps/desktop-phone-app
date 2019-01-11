import configureMockStore from "redux-mock-store";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as actions from "calls/actions/search";

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares);

describe("search actions", () => {
  it("should create an action to select user", () => {
    const expectedAction = {
      type: actions.USER_SELECTED
    };
    expect(actions.selectUser()).toEqual(expectedAction);
  });

  it("should create an action to unselect user", () => {
    const expectedAction = {
      type: actions.USER_NOT_SELECTED
    };
    expect(actions.unSelectUser()).toEqual(expectedAction);
  });

  it("should create and endpoint for the search api", () => {
    const value = "USERNAME";
    const expectedResult = `http://localhost:7075/api/v1/users/search/?username=${value}`;
    expect(actions.buildSearchEndpoint(value)).toEqual(expectedResult);
  });
});

describe("async search test", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("should dispatch SEARCH_SUCCESS when searchUsers is called", () => {
    const value = "USERNAME";
    const body = [
      {
        division: "DIVISION",
        cernGroup: "GROUP",
        cernSection: "SECTION",
        displayName: "NAME"
      }
    ];
    fetchMock.getOnce(
      `http://localhost:7075/api/v1/users/search/?username=${value}`,
      { body: body, headers: { "content-type": "application/json" } }
    );
    const expectedActions = [
      { type: actions.SEARCH_REQUEST },
      { type: actions.SEARCH_SUCCESS, payload: body }
    ];
    const store = mockStore({});
    return store.dispatch(actions.searchUsers(value)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
