import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Dropdown, Flag, Form, Header } from 'semantic-ui-react'

const languageOptions = [
  {
    text: 'Français',
    value: 'fr',
    image: <Flag name='fr'/>
  },
  {
    text: 'English',
    value: 'en',
    image: <Flag name='gb'/>
  },
  {
    text: 'Español',
    value: 'es-ES',
    image: <Flag name='es'/>
  }
]

class LanguageSettings extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired
  }

  changeLanguage = (lng) => {
    console.debug(lng)
    const {i18n} = this.props
    i18n.changeLanguage(lng)
  }

  render () {
    const {t} = this.props
    return (
      <div>
        <Header as={'h4'}>{t('language.header')}</Header>
        <Form>
          <Form.Field>
            <Dropdown
              selection
              defaultValue={this.props.i18n.language}
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
