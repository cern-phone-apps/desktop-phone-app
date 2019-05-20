import { createStackNavigator } from 'react-navigation';
import LoginScreenContainer from '../screens/LoginScreen/LoginScreenContainer';
import LoginWebViewContainer from '../screens/LoginWebView/LoginWebViewContainer';

export default createStackNavigator({
  SignIn: {
    screen: LoginScreenContainer,
    navigationOptions: () => ({
      headerTitleStyle: {
        color: 'white'
      },
      title: `Sign in`,
      headerStyle: {
        backgroundColor: '#2196F3'
      },
      headerTintColor: 'white'
    })
  },
  LoginWebView: {
    screen: LoginWebViewContainer,
    navigationOptions: () => ({
      headerTitleStyle: {
        color: 'white'
      },
      title: `Input your credentials`,
      headerStyle: {
        backgroundColor: '#2196F3'
      },
      headerTintColor: 'white'
    })
  }
});
