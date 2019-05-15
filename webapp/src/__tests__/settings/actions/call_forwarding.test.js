import * as actions from "settings/actions/call_forwarding";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares);

describe("Add Settings Call Forwarding Actions", () => {
  it("Should add a local forward number", () => {
    const number = "123456";
    const expectedAction = {
      type: actions.ADD_LOCAL_FORWARD_NUMBER,
      number
    };
    expect(actions.addLocalForwardNumber(number)).toEqual(expectedAction);
  });
});

describe("Call Forwarding get status actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("should dispatch CALL_FORWARDING_SUCCESS when getCallForwardingStatus is called", () => {
    const body = [
      {
        "simultaneous-ring": false,
        "destination-list-count": 1,
        success: true,
        "call-forwarding": true,
        "destination-list": ["+41754000"],
        message: "Status for extension 64595 retrieved successfully."
      }
    ];
    fetchMock.getOnce(`http://localhost:7075/api/v1/call-forwarding/`, {
      body: body,
      headers: { "content-type": "application/json" }
    });
    const expectedActions = [
      { type: actions.CALL_FORWARDING_REQUEST },
      { type: actions.CALL_FORWARDING_SUCCESS, payload: body }
    ];
    const store = mockStore({});
    return store.dispatch(actions.getCallForwardingStatus()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
