import React from 'react'
import {shallow} from 'enzyme'
import RecentCallList from './RecentCallList'

describe('RecentCallList tests', () => {
  const mockFn = jest.fn()
  it('renders without crashing', () => {
    const wrapper = shallow(<RecentCallList calling={false} makeCall={mockFn} onCall={false}/>)
  })
})