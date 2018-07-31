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
                                    t={key=> key}
                                    toggleDialpad={toggleDialpad}
                                    updateSearchValue={updateSearch}
                                    userSelected={false}/>);

    expect(wrapper.text()).toEqual('header<Segment /><Segment /><Button />');
    expect(wrapper.debug()).toContain('Segment');
    expect(wrapper.debug()).toContain('Caller__ConnectedParagraph');
    expect(wrapper.debug()).toContain('withRouter');
    expect(wrapper.debug()).toContain('You are connected with number');
    expect(wrapper.debug()).toContain('12345');

  })
})