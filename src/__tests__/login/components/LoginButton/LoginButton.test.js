import React from 'react'
import { shallow } from 'enzyme'
import 'i18n'
import { LoginButton } from 'login/components/LoginButton/LoginButton'
it('renders without crashing', () => {
  const button = shallow(
    <LoginButton t={key => key} loggedIn={false} urlQuery={''} />
  )

  expect(button.text()).toEqual('<Button />')
  expect(button.html()).toContain('blue')
  expect(button.html()).toContain('LoginButton')
  expect(button.html()).toContain('loginButtonText')
})

it('changes redirect state on click', () => {
  const mockWindow = { location: { href: null } }
  const button = shallow(
    <LoginButton
      t={key => key}
      loggedIn={false}
      urlQuery={''}
      window={mockWindow}
    />
  )

  // fn({ window: mockWindow });
  const div = button.find('.LoginButton')
  expect(button.state().redirected).toEqual(false)
  div.simulate('click')
  expect(button.state().redirected).toEqual(true)
})

it('changes authorizeUrl url state on click', () => {
  const mockWindow = { location: { href: null } }
  const sampleAuthUrl =
    'https://oauth/OAuth/Authorize?client_id=test&response_type=code&redirect_uri=https%3A%2F%2Fhostname'
  const button = shallow(
    <LoginButton
      t={key => key}
      loggedIn={false}
      urlQuery={''}
      window={mockWindow}
    />
  )
  const div = button.find('.LoginButton')
  expect(button.state().authorizeUrl).toEqual(undefined)
  div.simulate('click')
  expect(button.state().authorizeUrl).toEqual(sampleAuthUrl)
})
