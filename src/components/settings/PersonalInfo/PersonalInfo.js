import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'
import { translate } from 'react-i18next'

const fullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`
}

const PersonalInfo = props => {
  const {t} = props
  return (
    <div>
      <Header as={'h4'}>{t('personalInfo.header')}</Header>
      <ul>
        <li>{t('personalInfo.name')} {fullName(props.firstName, props.lastName)}
        </li>
        <li>{t('personalInfo.username')} {props.username}
        </li>
        <li>{t('personalInfo.email')} {props.email}
        </li>
      </ul>
    </div>
  )
}

PersonalInfo.propTypes = {
  t: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default translate('settings')(PersonalInfo)
