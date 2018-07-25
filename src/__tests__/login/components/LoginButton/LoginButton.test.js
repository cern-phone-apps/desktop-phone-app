import React from 'react'
import {shallow} from 'enzyme'
import 'i18n'
import {LoginButton} from 'login/components/LoginButton/LoginButton'


it('renders without crashing', () => {

  const button = shallow(
    <LoginButton
    t={key => key}
    loggedIn={false}
    urlQuery={''}
    />);

  expect(button.text()).toEqual('<Button />')
  expect(button.html()).toContain('blue')
  expect(button.html()).toContain('LoginButton')
  expect(button.html()).toContain('loginButtonText')
})


it('changes redirect state on click', () => {
  const button = shallow(
    <LoginButton
      t={key => key}
      loggedIn={false}
      urlQuery={''}
    />);
  const div = button.find('.LoginButton')
  expect(button.state().redirected).toEqual(false);
  div.simulate('click')
  expect(button.state().redirected).toEqual(true);
})

it('changes authorizeUrl url state on click', () => {
  const sampleAuthUrl = 'https://oauth/OAuth/Authorize?client_id=test&response_type=code&redirect_uri=https://hostname'
  const button = shallow(
    <LoginButton
      t={key => key}
      loggedIn={false}
      urlQuery={''}
    />);
  const div = button.find('.LoginButton')
  expect(button.state().authorizeUrl).toEqual(undefined);
  div.simulate('click')
  expect(button.state().authorizeUrl).toEqual(sampleAuthUrl);
})