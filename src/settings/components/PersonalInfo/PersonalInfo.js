import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'
import { translate } from 'react-i18next'

/**
 * Generates the user's full name
 * @param firstName
 * @param lastName
 * @returns {string}
 */
const fullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`
}
/**
 * Displays the user's information
 *
 * @param t Translate object for i18N
 * @param firstName
 * @param lastName
 * @param username
 * @param email
 * @returns {*}
 * @constructor
 */
const PersonalInfo = ({t, firstName, lastName, username, email}) => {
  return (
    <div>
      <Header as={'h4'}>{t('personalInfo.header')}</Header>
      <ul>
        <li>{t('personalInfo.name')} {fullName(firstName, lastName)}
        </li>
        <li>{t('personalInfo.username')} {username}
        </li>
        <li>{t('personalInfo.email')} {email}
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
