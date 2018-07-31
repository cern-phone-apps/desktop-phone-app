import React from 'react'
import {callsMain, callsRoutes} from 'calls/routes/utils'
import {callsRoute} from 'calls/routes'

it('has expected path', () => {
  expect(callsRoute.path).toEqual('/')
  expect(callsRoute.exact).toEqual(true)
})

it('renders a Route', () => {
  const callsComponent = callsMain()
  const wrapper = shallow(callsComponent)
  expect(wrapper).toHaveLength(1)
  expect(wrapper.find('Route')).toHaveLength(1)
})

it('renders callsRoutes without crashing', () => {
  const t = jest.fn()
  const callsComponent = callsRoutes(t)
  expect(callsComponent).toHaveLength(1)
})
