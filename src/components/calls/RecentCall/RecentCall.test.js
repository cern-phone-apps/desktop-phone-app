import React from 'react'
import {shallow} from 'enzyme'
import RecentCall from './RecentCall'

describe('async auth actions', () => {
  const mockFn = jest.fn()
  it('renders without crashing', () => {
    const wrapper = shallow(<RecentCall
      author={'Mr.Author'}
      calling={false}
      incoming={false}
      image={'https://hostname/image.jpg'}
      missed={true}
      onCall={false}
      makeCall={mockFn}
    />)
    expect(wrapper.html()).toEqual(expect.stringContaining('red'))
    expect(wrapper.html()).toEqual(expect.stringContaining('Mr.Author'))
    expect(wrapper.html()).toEqual(expect.stringContaining('<img src=\"https://hostname/image.jpg\"'))
    expect(wrapper.html()).toEqual(expect.stringContaining('arrow up'))

  })

  it('triggers call action', () => {
    const wrapper = shallow(<RecentCall
      author={'Mr.Author'}
      calling={false}
      incoming={false}
      image={'https://hostname/image.jpg'}
      missed={true}
      onCall={false}
      makeCall={mockFn}
    />)
    wrapper.find('Button').simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })
})