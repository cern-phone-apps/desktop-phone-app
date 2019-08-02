import { callsRoute } from 'calls/routes';
import { callsRoutes } from 'calls/routes/utils';

/**
 * Sets the application's main route.
 * In this case, it will be calls
 * @type {{path: string}}
 */
export const mainRoute = {
  path: callsRoute.path
};

/**
 * All the application's screens are loaded here.
 * When a new module is added, it must be added to the mainRoutes array in
 * order to be loaded by the application.
 * @param t Translate provider
 * @returns {...*[]} An array with all the application's routes.
 */
export const mainRoutes = function getCallScreens(t) {
  const callsScreens = callsRoutes(t);

  return [...callsScreens];
};
