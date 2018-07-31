import React from 'react'
import {shallow} from 'enzyme'
import 'i18n'
import {LoadingDimmer} from 'login/components/LoadingDimmer/LoadingDimmer'
import {Dimmer, Loader} from 'semantic-ui-react'

it('renders without crashing', () => {
  const loader = shallow(<LoadingDimmer t={key => key}/>)

  expect(loader.text()).toEqual('<Dimmer />')
  expect(loader.html()).toContain('loadingText')
  expect(loader.html()).toContain('visible')
  expect(loader.html()).toContain('inverted')
})

it('renders inner nodes', () => {
  const loader = shallow(<LoadingDimmer t={key => key}/>)

  expect(loader.find(Dimmer)).toHaveLength(1)
  expect(loader.find(Loader)).toHaveLength(1)
})
