import React from 'react'
import {CallPageContainer} from 'containers/pages/calls'

export const loginRoute = {
  path: '/login/'
}

export const redirectRoute = {
  path: '/redirect/'
}

const callsMain = () => {
  return <CallPageContainer/>
}

export const mainRoutes = function (t) {
  return [
    {
      path: '/',
      exact: true,
      sidebarText: t('calls'),
      sidebarIcon: 'phone',
      sidebarId: 'calls',
      main: callsMain
    }
  ]
}
