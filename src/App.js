import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';

import RoutedMainPageContainer from 'common/screens/MainPage/MainPageContainer';
import RoutedLoginPageContainer from 'auth/screens/LoginPage/LoginPageContainer';
import NotConnectedScreenContainer from 'calls/screens/CallsScreen/NotConnectedScreen/NotConnectedScreenContainer';
import * as routes from 'routes';
import * as loginRoutes from 'auth/routes';
import { registerRoute } from 'calls/routes';
import { logMessage } from 'common/utils/logs';

const NoMatch = ({ location }) => (
  <div>
    <h3>
      404 - No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

NoMatch.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};
/**
 * The application will load the registerRoute by default,
 * then the mainRoute and then the login one
 */
function App() {
  return (
    <Switch>
      <Route
        path={registerRoute.path}
        component={NotConnectedScreenContainer}
        exact={registerRoute.exact}
      />
      <Route
        exact={routes.mainRoute.exact}
        path={routes.mainRoute.path}
        component={RoutedMainPageContainer}
      />
      <Route
        path={loginRoutes.loginRoute.path}
        component={RoutedLoginPageContainer}
      />
    </Switch>
  );
}

export default translate('translations')(App);
