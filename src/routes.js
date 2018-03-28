import React from 'react'
import {CallPageContainer} from 'containers/main/calls'

export const loginRoute = {
  path: '/login/'
}

export const redirectRoute = {
  path: '/redirect/'
}

const callsMain = () => {
  return <CallPageContainer/>
}

export const mainRoutes = [
  {
    path: '/',
    exact: true,
    sidebarText: 'Calls',
    sidebarIcon: 'phone',
    sidebarId: 'calls',
    main: callsMain
  }
//   {
//     path: '/chat',
//     exact: false,
//     sidebarText: 'Messages',
//     sidebarIcon: 'comment outline',
//     sidebarId: 'messages',
//     main: messagesMain
//   }
]
