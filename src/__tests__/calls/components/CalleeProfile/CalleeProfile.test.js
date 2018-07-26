import React from 'react'
import {CalleeProfile} from 'calls/components/CalleeProfile/CalleeProfile'

describe('CalleeProfile Component tests', () => {

  it('renders CalleeProfile without crashing', () => {
    const getProfile = jest.fn();
    const wrapper = shallow(<CalleeProfile
      t={key => key}
      fetching={false}
      getUserProfile={getProfile}
      username={'example'}/>)
    expect(wrapper.text()).toEqual('<ProfileInfo /><Menu />');
  })

})

