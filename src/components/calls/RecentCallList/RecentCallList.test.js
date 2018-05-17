import React from 'react'
import {shallow} from 'enzyme'
import RecentCallList from './RecentCallList'
import RecentCall from 'components/calls/RecentCall/RecentCall'

describe('RecentCallList tests', () => {
  const mockFn = jest.fn()
  it('renders without crashing', () => {
    const wrapper = shallow(<RecentCallList calling={false} makeCall={mockFn} onCall={false}/>)
    // No RecentCall items (empty list)
    // expect(wrapper.text()).not.toEqual(expect.stringContaining('RecentCall'))

  })
})