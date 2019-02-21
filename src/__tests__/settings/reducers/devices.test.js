import * as actions from 'settings/actions/devices'
import reducer from "settings/reducers/devices";

describe("search reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      microphone: null,
      speaker: null
    });
  });

  it("should handle SET_MICROPHONE", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SET_MICROPHONE,
          microphone: '123'
        }
      )
    ).toEqual({

      microphone: undefined

    });
  });

  it("should handle SET_SPEAKER", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SET_MICROPHONE,
          speaker: '123'
        }
      )
    ).toEqual({

      speaker: undefined

    });
  });

});