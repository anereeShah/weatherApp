import React from 'react';
import {
    View,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Dimensions,
    Button,
    Text,
    TouchableHighlight,
    ActivityIndicator,
} from 'react-native';
import InputFieldComponent from './InputFieldComponent';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends React.Component {
    static navigationOptions = () => ({
        header: null
    });
    constructor(props) {
        super(props);
        this.state = {
            email: "Email",
            pwd: "Password",
            isLoading: true,
            emailCheck: false,
            pwdCheck: false,
            
        }
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);

        this.handlePress = this.handlePress.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);

    }
    onChangeEmail(text) {
        this.setState({ email: text });
    }
    onChangePwd(text) {
        this.setState({ pwd: text });
    }
    handlePress() {
        AsyncStorage.setItem("userToken",this.state.email);
        this.props.navigation.navigate("Home");
    }

    handleForgotPassword() {
        this.props.navigation.navigate("ForgotPwd");
    }

    handleSignUp() {
        this.props.navigation.navigate("SignUp");
    }

    componentDidMount() {
        setInterval(() => { this.setState({ isLoading: false }) }, 2000)
    }
    focusNextField(id) {
        this.inputs[id].focus();
    }
    render() {
        let emailCheck = /^(?=.*[a-z])[a-z\d@$!#%*_\-.?&]*\@(?=.*[a-z])[a-z]*\.(?=.*[a-z])[a-z]{2,}/;
        let pwdCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!#%*?&]{8,15}$/;
        if (this.state.isLoading) {
            return (
                <View>
                    <SplashScreen />
                </View>
            )
        }
        else {
            return (
                <View>
                    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                    <ImageBackground source={require('../images/bg.jpg')} style={{ width: "100%", height: "100%" }}>
                        <View style={styles.mainContainer}>
                            
                            <InputFieldComponent
                                name="Email"
                                validation={emailCheck}
                                keyboardType="email-address"
                                onChangeText={this.onChangeEmail}
                                isValid={(valid) => { this.setState({ emailCheck: valid }) }}
                                onRef={(ref) => {
                                    this.inputs['email'] = ref;
                                }}
                                onSubmitEditing={() => this.focusNextField('password')}
                            />
                            <InputFieldComponent
                                name="Password"
                                validation={pwdCheck}
                                keyboardType="default"
                                onChangeText={this.onChangePwd}
                                secureTextEntry="Password"
                                isValid={(valid) => { this.setState({ pwdCheck: valid }) }}
                                onSubmitEditing={() => this.props.navigation.navigate("Home")}
                                onRef={(ref) => {
                                    this.inputs['password'] = ref;
                                }}
                            />
                            <Button
                                title="Sign In"
                                onPress={this.handlePress}
                                disabled={this.state.emailCheck === true && this.state.pwdCheck === true ? false : true}
                                color="teal"
                            />
                            <View style={styles.options}>
                                <TouchableHighlight>
                                    <Text style={{ color: "white" }} onPress={this.handleForgotPassword}>Forgot Password</Text>
                                </TouchableHighlight>
                                <TouchableHighlight>
                                    <Text
                                        style={{
                                            color: "white",
                                            paddingLeft: Dimensions.get("window").width / 100 * 26
                                        }}
                                        onPress={this.handleSignUp}
                                    >
                                        Sign Up
                                        </Text>
                                </TouchableHighlight>

                            </View>

                        </View>
                    </ImageBackground>
                </View>
            )
        }
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

const styles = StyleSheet.create({
    mainContainer: {
        flex: 10,
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        width: Dimensions.get("window").width / 100 * 65,
    },
    rowContainer: {
        height: Dimensions.get("window").height / 100 * 11,
        margin: 5,
    },
    inputContainer: {

        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        borderWidth: 2,

        color: "white",
        fontSize: Dimensions.get("window").height / 100 * 2.5,
        fontWeight: "bold"

    },
    activateError: {
        borderBottomColor: "red",
    },
    activateAccept: {
        borderBottomColor: "green"
    },
    default: {
        borderBottomColor: "white"
    },
    options: {
        flexDirection: "row",
        width: Dimensions.get("window").width / 100 * 65,
        marginTop: 5
    }
})