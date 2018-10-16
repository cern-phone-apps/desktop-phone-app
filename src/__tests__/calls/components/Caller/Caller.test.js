import React from 'react'
import {Caller} from 'calls/components/Caller/Caller'

describe('Caller Container', () => {
  it('renders without crashing', () => {
    const updateSearch = jest.fn()
    const toggleDialpad = jest.fn()
    const makeCall = jest.fn()
    const wrapper = shallow(<Caller activeNumber={'12345'}
                                    displayDialpad={false}
                                    makeCall={makeCall}
                                    searchValue={''}
                                    t={key => key}
                                    toggleDialpad={toggleDialpad}
                                    updateSearchValue={updateSearch}
                                    userSelected={false}
                                    onCall={false}
                                    calling={false}/>)

    expect(wrapper.text()).toEqual('<Segment />')
    expect(wrapper.debug()).toContain('Segment')
    expect(wrapper.debug()).toContain('displayDialpadAction')
    expect(wrapper.debug()).toContain('Connect')
    expect(wrapper.debug()).toContain('UserSearch')
  })
})
