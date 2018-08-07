import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Dropdown, Flag, Form, Header } from 'semantic-ui-react'

const languageOptions = [
  {
    text: 'English',
    value: 'en',
    image: <Flag name='gb'/>
  },
  {
    text: 'Français',
    value: 'fr',
    image: <Flag name='fr'/>
  }
]

/**
 * Handles the language change on the application
 */
class LanguageSettings extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired
  }

  changeLanguage = (lng) => {
    const {i18n} = this.props
    i18n.changeLanguage(lng)
  }

  render () {
    const {language} = this.props.i18n
    const {t} = this.props

    let currentLanguage = language
    if (!languageOptions.some(e => e.value === language)) {
      currentLanguage = 'en'
    }

    return (
      <div>
        <Header as={'h4'}>{t('language.header')}</Header>
        <Form>
          <Form.Field>
            <Dropdown
              selection
              defaultValue={currentLanguage}
              options={languageOptions}
              placeholder={t('language.selectLanguage')}
              onChange={(event, data) => this.changeLanguage(data.value)}
            />
          </Form.Field>
        </Form>
      </div>
    )
  }
}

export default translate('settings')(LanguageSettings)
