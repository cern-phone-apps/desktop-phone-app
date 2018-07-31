import userReducer from 'login/reducers'

describe('auth index reducer', () => {
  it('should return the combined reducers', () => {

    expect(userReducer).not.toBe(null)
    expect(userReducer).toEqual(expect.any(Function))
  })
})