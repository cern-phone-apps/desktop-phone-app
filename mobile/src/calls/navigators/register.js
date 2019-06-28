import React from 'react';
import { createStackNavigator } from 'react-navigation';

import RegisterScreenContainer from '../screens/RegisterScreen/RegisterScreenContainer';
import LogoutMenuContainer from '../../auth/components/LogoutMenu/LogoutMenuContainer';
import ColorPalette from '../../styles/ColorPalette';

const RegisterStack = createStackNavigator({
  RegisterScreen: {
    screen: RegisterScreenContainer,
    navigationOptions: () => {
      return {
        headerTitleStyle: {
          color: 'white'
        },
        title: `Select your number`,
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white',
        headerRight: <LogoutMenuContainer />
      };
    }
  }
});

export default RegisterStack;
