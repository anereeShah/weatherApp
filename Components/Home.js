import React from 'react';
import {
    View,
    Button,
    ImageBackground,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true
        }
    }
    componentDidMount(){
        setInterval(()=>this.setState({isLoading:false}),2000);
    }
    handleSignOut(){
        AsyncStorage.removeItem("userToken");
        this.props.navigation.navigate("Auth");
    }
    render(){
        if(this.state.isLoading){
            return(
                <SplashScreen/>
            )
        }
        return(
            <View>
                <Button onPress={this.handleSignOut.bind(this)} title="Sign Out"/>
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