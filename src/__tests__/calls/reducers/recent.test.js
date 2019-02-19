import * as actions from "calls/actions/recent";
import reducer from "calls/reducers/recent";

describe("recent reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      lastRecentId: 0,
      recentCalls: []
    });
  });

  it("should handle PROFILE_REQUEST", () => {
    expect(
      reducer(
        {recentCalls: [], lastRecentId: 1 },
        {
          type: actions.ADD_RECENT_CALL,
          recentCall:
             {
              name: 'name',
              phoneNumber: '123456',
              startTime: '123456',
              incoming: true,
              missed: false
            }
        }
      )
    ).toEqual({

      lastRecentId: 2,
      recentCalls: [
        {
          endTime: expect.any(Number),
          id: 2,
          incoming: true,
          missed: false,
          name: "name",
          phoneNumber: "123456",
          startTime: "123456"
        }
      ]
    });
  });


});
