/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  ImageBackground,
  View,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import Home from './Components/Home'
import {
  createAppContainer, createSwitchNavigator
} from 'react-navigation';
import {
  createStackNavigator
} from 'react-navigation-stack';
import LoginScreen from './Components/LoginScreen';
import AuthScreen from './Components/AuthScreen';
import ForgotPassword from './Components/ForgotPassword';
import SignUp from './Components/SignUp';
export default class App extends React.Component {

  render() {
    return (
      <AppContainer />
    )
  }
}

const loginStackNavigator=createStackNavigator({
  Login:LoginScreen,
  ForgotPwd:ForgotPassword,
  SignUp:SignUp,
})
const AppSwitchNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Login: loginStackNavigator,
  Home: Home
})
const AppContainer = createAppContainer(AppSwitchNavigator);

