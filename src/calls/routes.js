import React from 'react'
import {CallsScreenContainer} from 'calls/containers/screens'

export const callsRoute = {
  path: '/',
  exact: true
}

export const callsMain = () => {
  return <CallsScreenContainer/>
}

export const callsRoutes = (t) => {
  return [
    {
      ...callsRoute,
      sidebarText: t('calls'),
      sidebarIcon: 'phone',
      sidebarId: 'calls',
      main: callsMain
    },
  ]
}