import React from 'react';

import { IconButton } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation';
import ContactsScreenContainer from '../screens/ContactsScreen/ContactsScreenContainer';
import SearchUsersScreenContainer from '../screens/SearchUsersScreen/SearchUsersScreenContactsContainer';
import UserDetailsScreenContainer from '../screens/ContactsScreen/UserDetailsScreenContainer';
import { contactsFormatter } from '../../common/utils/formatters';
import ColorPalette from '../../styles/ColorPalette';

export default createStackNavigator({
  Contacts: {
    screen: ContactsScreenContainer,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitleStyle: {
          color: 'white'
        },
        title: `Contacts`,
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white',
        headerRight: (
          <IconButton
            icon="add"
            color={ColorPalette.menuActive}
            onPress={() => navigation.navigate('SearchUsers')}
          />
        ),
        headerRightContainerStyle: {
          marginRight: 10
        }
      };
    }
  },
  SearchUsers: {
    screen: props => (
      <SearchUsersScreenContainer
        {...props}
        formatSearchResults={contactsFormatter}
      />
    ),
    navigationOptions: () => ({
      headerTitleStyle: {
        color: 'white'
      },
      title: 'Search for users',
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  },
  UserDetails: {
    screen: UserDetailsScreenContainer,
    navigationOptions: () => ({
      title: 'User Details',
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  }
});
