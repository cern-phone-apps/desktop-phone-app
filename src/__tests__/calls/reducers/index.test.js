import callsReducer from 'calls/reducers'

describe('calls index reducer', () => {
  it('should return the combined reducers', () => {
    expect(callsReducer).not.toBe(null)
    expect(callsReducer).toEqual(expect.any(Function))
  })
})