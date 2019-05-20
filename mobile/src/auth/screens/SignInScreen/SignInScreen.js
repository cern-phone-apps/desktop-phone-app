import React from 'react';
import {
  AsyncStorage,
  View,
} from 'react-native';
import { Button } from "react-native-elements";

export class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in"
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
}
//
// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: "Welcome to the app!"
//   };
//
//   render() {
//     return (
//       <View>
//         <Button title="Show me more of the app" onPress={this._showMoreApp} />
//         <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
//       </View>
//     );
//   }
//
//   _showMoreApp = () => {
//     this.props.navigation.navigate("Other");
//   };
//
//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate("Auth");
//   };
// }
