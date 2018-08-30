import React from 'react'
import {Header} from 'semantic-ui-react'
import {translate} from 'react-i18next'
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary'


const APP_VERSION = 'v0.1.0'

export const AppInfo = ({t}) => {
  return (
    <div>
      <ErrorBoundary>
        <Header as={'h4'}>{t('appInfo.header')}</Header>
        <ul>
          <li>
            <strong>{t('appInfo.version')}</strong> {APP_VERSION}
          </li>
        </ul>
      </ErrorBoundary>
    </div>
  )
}

AppInfo.propTypes = {}

export default translate('settings')(AppInfo)
