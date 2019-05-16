import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';

import RoutedMainPageContainer from 'common/screens/MainPage/MainPageContainer';
import RoutedRedirectPageContainer from 'auth/screens/RedirectPage/RedirectPageContainer';
import RoutedLoginPageContainer from 'auth/screens/LoginPage/LoginPageContainer';
import * as routes from 'routes';
import * as loginRoutes from 'auth/routes';

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

function App() {
  return (
    <Switch>
      <Route
        exact
        path={routes.mainRoute.path}
        component={RoutedMainPageContainer}
      />
      <Route
        path={loginRoutes.redirectRoute.path}
        component={RoutedRedirectPageContainer}
      />
      <Route
        path={loginRoutes.loginRoute.path}
        component={RoutedLoginPageContainer}
      />
    </Switch>
  );
}

export default translate('translations')(App);
