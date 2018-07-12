import {callsRoute, callsRoutes} from 'calls/routes'

export const loginRoute = {
  path: '/login/'
}

export const redirectRoute = {
  path: '/redirect/'
}

export const mainRoute = {
  path: callsRoute.path
}


export const mainRoutes = function (t) {

  const callsScreens = callsRoutes(t)

  return [
    ...callsScreens
  ]
}
