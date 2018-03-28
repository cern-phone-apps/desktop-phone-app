import React from 'react'
import {CallPageContainer} from 'containers/main/calls'
import {ChatPageContainer} from 'containers/main/chat'

export const loginRoute = {
  path: '/login/'
}

export const redirectRoute = {
  path: '/redirect/'
}

const callsMain = () => {
  return <CallPageContainer/>
}

const chatMain = () => {
  return <ChatPageContainer/>
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
    },
    {
      path: '/chat',
      exact: false,
      sidebarText: t('messages'),
      sidebarIcon: 'comment outline',
      sidebarId: 'messages',
      main: chatMain
    }
  ]
}
