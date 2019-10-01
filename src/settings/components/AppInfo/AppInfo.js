import React from 'react';
import { Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { version } from 'common/utils/appInfo';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';

/**
 * Displays the app information. Likely to be used in settings.
 * @param {t} translate function
 */
export const AppInfo = ({ t }) => (
  <div>
    <ErrorBoundary>
      <Header as="h4">{t('appInfo.header')}</Header>
      <ul>
        <li>
          <strong>{t('appInfo.version')}</strong> {version}
        </li>
      </ul>
    </ErrorBoundary>
  </div>
);

AppInfo.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate('settings')(AppInfo);
