import React from 'react'
import RecentCall from 'calls/components/RecentCallList/RecentCall'

describe('RecentCall component', () => {
  it('renders without crashing', () => {

    const call = {
      author: 'author name',
      endTime: 1533029231856 + 6000,
      incoming: false,
      missed: false,
      phoneNumber: '12345',
      startTime: 1533029231856,
      name: 'test'
    }

    const wrapper = shallow(<RecentCall recentCall={call}/>)

    expect(wrapper.text()).toEqual('<Item />')
    expect(wrapper.debug()).toContain('ItemContent')
    expect(wrapper.debug()).toContain('GridColumn')
    expect(wrapper.debug()).toContain('Icon')
    expect(wrapper.debug()).toContain('a few seconds')
    expect(wrapper.debug()).toContain('12345')
  })
})
