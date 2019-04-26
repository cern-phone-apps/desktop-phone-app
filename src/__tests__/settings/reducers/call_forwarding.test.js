import reducer from "settings/reducers/call_forwarding";
import * as actions from "settings/actions/call_forwarding";

describe("Call Forwarding reducers", () => {
  const initialState = {
    localForwardList: [],
    fetchingStatus: false,
    status: {}
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle CALL_FORWARDING_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: actions.CALL_FORWARDING_REQUEST
      })
    ).toEqual({
      localForwardList: [],
      fetchingStatus: true,
      status: {}
    });
  });

  it("should handle ADD_LOCAL_FORWARD_NUMBER", () => {
    expect(
      reducer(initialState, {
        type: actions.ADD_LOCAL_FORWARD_NUMBER,
        number: "12345"
      })
    ).toEqual({
      localForwardList: [{"text": "12345", "value": "12345"}],
      fetchingStatus: false,
      status: {}
    });
  });

  it("should handle CALL_FORWARDING_SUCCESS", () => {
    let initial = {
      localForwardList: [],
      fetchingStatus: true,
      status: {}
    };

    expect(
      reducer(initial, {
        type: actions.CALL_FORWARDING_SUCCESS,
        payload: {
          result: {
            key: "value"
          }
        }
      })
    ).toEqual({
      localForwardList: [],
      fetchingStatus: false,
      status: {
        key: "value"
      }
    });
  });

  it("should handle CALL_FORWARDING_FAILURE", () => {
    let initial = {
      localForwardList: [],
      fetchingStatus: true,
      status: {}
    };

    expect(
      reducer(initial, {
        type: actions.CALL_FORWARDING_FAILURE,
        payload: {
          result: {
            key: "value"
          }
        }
      })
    ).toEqual({
      localForwardList: [],
      fetchingStatus: false,
      status: {}
    });
  });
});
