import React from 'react';
import { Icon } from 'react-native-elements';

export function formatUserOrganization(profile) {
  const organization = [];

  if (profile.division && profile.division !== '[]')
    organization.push(profile.division);
  if (profile.cernGroup && profile.cernGroup !== '[]')
    organization.push(`${profile.cernGroup}`);
  if (profile.cernSection && profile.cernSection !== '[]')
    organization.push(`${profile.cernSection}`);

  return organization.join('-');
}

export const formatResultsOneLinePerPhone = (results, props) => {
  const searchResults = [];
  let index = 1;
  results.map(item => {
    if (item.phones) {
      const phones = item.phones.filter(
        phone => phone.number && phone.number !== undefined
      );

      phones.map(phone => {
        const isAlreadySelected = !!props.selection.find(
          number => number === phone.number
        );

        const rightIcon = isAlreadySelected ? (
          <Icon type="font-awesome" name="check-square" color="green" />
        ) : (
          <Icon
            type="font-awesome"
            name="plus"
            onPress={() => {
              const func = props.callForwardingStatus
                ? props.enableCallForwarding
                : props.enableSimultaneousRinging;
              func(props.activeNumber, [phone.number]).then(() =>
                props.getCallForwardingStatus(props.activeNumber)
              );
            }}
          />
        );
        index += 1;
        const result = {
          id: `phone-${index}`,
          subtitle: `${item.displayName} (${formatUserOrganization(item)})`,
          title: phone.number,
          leftIcon: {
            name: phone.phoneType === 'mobile' ? 'mobile' : 'phone',
            type: 'font-awesome'
          },
          bottomDivider: true,
          rightIcon
        };
        searchResults.push(result);
        return result;
      });
      return searchResults;
    }
    return searchResults;
  });
  return searchResults;
};

export function contactsFormatter(results, props) {
  return results.map(item => {
    const isAlreadySelected = !!props.selection.find(
      user => parseInt(user.personId, 10) === parseInt(item.personId, 10)
    );
    const rightIcon = isAlreadySelected ? (
      <Icon type="font-awesome" name="check-square" color="green" />
    ) : (
      <Icon
        type="font-awesome"
        name="plus"
        onPress={() => props.addUser(item).then(() => props.getSelectedUsers())}
      />
    );

    return {
      id: item.personId,
      title: `${item.displayName} (${item.division})`,
      leftIcon: { name: 'user', type: 'font-awesome' },
      bottomDivider: true,
      rightIcon
    };
  });
}
