import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StatusBar, ImageBackground, ActivityIndicator } from 'react-native';
import LoginScreen from './LoginScreen';

export default class AuthScreen extends React.Component {
  async componentDidMount() {
    const userToken = await AsyncStorage.getItem("userToken");
    this.props.navigation.navigate(userToken ? "Home" : "Login");
    
  }
  render() {

      return (
        <View>
        </View>
      )
    
  }

}
class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <ImageBackground source={require('../images/bg.jpg')} style={{ width: "100%", height: "100%" }}>
          <ActivityIndicator style={{ flex: 1, justifyContent: "center", marginLeft: "auto", marginRight: "auto" }} size="large" color={"#ffffff"} />
        </ImageBackground>
      </React.Fragment>
    )
  }
}