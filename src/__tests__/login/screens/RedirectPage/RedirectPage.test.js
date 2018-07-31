import React from 'react'
import RedirectPage from 'login/screens/RedirectPage/RedirectPage'

it('renders without crashing', () => {
  const login = jest.fn()
  const getMe = jest.fn()
  const loader = shallow(<RedirectPage
    login={login}
    isAuthenticated={false}
    urlQuery={''}
    getMe={getMe}/>)

  expect(loader.text()).toEqual('<Redirect />')
})
