import React from 'react'
import PropTypes from 'prop-types'
import {Dimmer, Loader} from 'semantic-ui-react'
import {translate} from 'react-i18next'

/**
 * Full screen loader
 * @param t Translate function from i18n
 * @returns {*}
 * @constructor
 */
const LoadingDimmer = ({t}) => {
  return (<Dimmer active inverted>
    <Loader size='large'>{t('loadingText')}</Loader>
  </Dimmer>)
}

LoadingDimmer.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate('translations')(LoadingDimmer)
