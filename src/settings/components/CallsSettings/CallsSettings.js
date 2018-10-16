import React from 'react'
import {Header} from 'semantic-ui-react'
import {translate} from 'react-i18next'
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary'
import DisconnectNumberButtonContainer
  from 'calls/containers/components/DisconnectNumberButton/DisconnectNumberButtonContainer'


export const CallsSettings = () => {
  return (
    <div>
      <ErrorBoundary>
        <Header as={'h4'}>{'Calls Settings'}</Header>
        <DisconnectNumberButtonContainer displayMessage={true}/>
      </ErrorBoundary>
    </div>
  )
}

export default translate('settings')(CallsSettings)
