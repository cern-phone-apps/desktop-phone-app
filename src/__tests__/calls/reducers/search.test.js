import * as actions from "calls/actions/search";
import reducer from "calls/reducers/search";

describe("search reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      userSelected: false,
      searching: false,
      searchEnable: false
    });
  });

  it("should handle USER_SELECTED", () => {
    expect(
      reducer(
        {},
        {
          type: actions.USER_SELECTED,
          user: "userTest",
          userSelected: true
        }
      )
    ).toEqual({
      user: "userTest",
      userSelected: true
    });
  });

  it("should handle USER_NOT_SELECTED", () => {
    expect(
      reducer(
        {},
        {
          type: actions.USER_NOT_SELECTED
        }
      )
    ).toEqual({
      userSelected: false
    });
  });

  it("should handle SEARCH_REQUEST", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SEARCH_REQUEST
        }
      )
    ).toEqual({
      searching: true,
      searchEnable: true
    });
  });

  it("should handle SEARCH_END", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SEARCH_END
        }
      )
    ).toEqual({
      searching: false,
      searchEnable: false
    });
  });

  it("should handle SEARCH_CLEAR", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SEARCH_CLEAR
        }
      )
    ).toEqual({});
  });

  it("should handle SEARCH_FAILURE", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SEARCH_FAILURE
        }
      )
    ).toEqual({
      searching: false
    });
  });

  it("should handle SEARCH_SUCCESS", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SEARCH_SUCCESS,
          payload: {
            result: [
              {
                division: "divisionTest",
                cernGroup: "groupTest",
                cernSection: "sectionTest",
                displayName: "displayNameTest",
                username: "usernameTest"
              }
            ]
          }
        }
      )
    ).toEqual({
      searching: false
    });
  });

  it("should handle SEARCH_SUCCESS with some undefined parameters", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SEARCH_SUCCESS,
          payload: {
            result: [
              {
                division: "[]",
                cernGroup: "[]",
                cernSection: "[]",
                displayName: "displayNameTest",
                username: "usernameTest"
              }
            ]
          }
        }
      )
    ).toEqual({
      searching: false
    });
  });

  it("should handle SEARCH_SUCCESS with undefined", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SEARCH_SUCCESS,
          payload: {
            result: undefined
          }
        }
      )
    ).toEqual({
      searching: false
    });
  });
});
