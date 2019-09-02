import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, List, Label, Icon } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';
import styles from './PersonalInfo.module.css';
/**
 * Generates the user's full name
 * @param firstName
 * @param lastName
 * @returns {string}
 */
const fullName = (firstName, lastName) => `${firstName} ${lastName}`;
const UserPhoneWithActiveNumber = ({ phone, activeNumber, icon = 'phone' }) => {
  const isActiveNumber = phone ? phone.includes(activeNumber) : false;
  return (
    <List.Item>
      <Icon className={styles.phoneListItem} name={icon} />
      {phone || '-'}{' '}
      {isActiveNumber ? (
        <Label as="span" color="green" content="active" size="mini" />
      ) : (
        ''
      )}
    </List.Item>
  );
};
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
export const PersonalInfo = ({ t }) => {
  const activeNumber = useSelector(state => state.numbers.activeNumber);
  const user = useSelector(state => state.user);

  return (
    <ErrorBoundary>
      <Header as="h4">{t('personalInfo.header')}</Header>
      <List>
        <List.Item
          icon="user"
          content={`${fullName(user.firstName, user.lastName)} (${
            user.username
          })`}
        />
        <List.Item icon="mail" content={user.email} />
        <UserPhoneWithActiveNumber
          phone={user.phone}
          activeNumber={activeNumber}
          icon="phone"
        />
        <UserPhoneWithActiveNumber
          phone={user.mobile}
          activeNumber={activeNumber}
          icon="mobile"
        />
      </List>
    </ErrorBoundary>
  );
};

PersonalInfo.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate('settings')(PersonalInfo);
