import React from 'react';
import {
    View,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Dimensions,
    Button,
    Picker,
    TouchableHighlight,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native';
import InputFieldComponent from './InputFieldComponent'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
export default class SignUp extends React.Component {
    static navigationOptions = () => ({
        header: null
    });
    constructor(props) {
        super(props);
        this.state = {
            email: "Email",
            pwd: "Password",
            rePwd: "Re-type Password",
            name: "Name",
            emailCheck: false,
            pwdCheck: false,
            nameCheck: false,
            repwdCheck: false,
            modalVisible: false,
            gender: "Mr",
            genderId: 1
        }
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onChangeRePwd = this.onChangeRePwd.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.handleValue = this.handleValue.bind(this);
    }
    handleValue(id) {
        const products = [{
            id: 1,
            value: "Mr"
        },
        {
            id: 2,
            value: "Mrs"
        },
        {
            id: 3,
            value: "Miss"
        }];
        products.forEach(element => {
            if (element.id === id) {
                console.log(element);
                this.setState({ gender: element.value, genderId: element.id });
            }
        })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    focusNextField(id) {
        this.inputs[id].focus();
    }
    onChangeEmail(text) {
        this.setState({ email: text });
    }
    onChangeName(text) {
        this.setState({ name: text });
    }
    onChangePwd(text) {
        this.setState({ pwd: text });
    }
    onChangeRePwd(text) {
        this.setState({ rePwd: text });
        if (this.state.pwd !== text) {
            this.setState({ repwdCheck: false });
        }
        else {
            this.setState({ repwdCheck: true })
        }
    }
    handlePress() {
        AsyncStorage.setItem("userToken", this.state.email);
        this.props.navigation.navigate("Home");
    }

    render() {
        let emailCheck = /^(?=.*[a-z])[a-z\d@$!#%*_\-.?&]*\@(?=.*[a-z])[a-z]*\.(?=.*[a-z])[a-z]{2,}/;
        let pwdCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!#%*?&]{8,15}$/;
        let nameCheck = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

        return (
            <View>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <ImageBackground source={require('../images/bg.jpg')} style={{ width: "100%", height: "100%" }}>
                    <Modal
                        animationType="slide"
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}
                    >
                        <View style={{ flex: 1, justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                            <View style={{ width: Dimensions.get("window").width / 100 * 60, backgroundColor: "white" }}>
                                <ModalComponent setModalVisible={this.setModalVisible} salutationSelected={this.handleValue} currentValue={this.state.genderId} />
                            </View>
                        </View>
                    </Modal>
                    <ScrollView>
                        <View style={styles.mainContainer}>
                            <View style={styles.pickerComponent}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(true);
                                    }}>
                                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", margin: 5 }}>{this.state.gender}</Text>

                                </TouchableOpacity>
                            </View>

                            <InputFieldComponent
                                name="Name"
                                keyboardType="email-address"
                                onChangeText={this.onChangeName}
                                validation={nameCheck}
                                onRef={(ref) => {
                                    this.inputs['name'] = ref;
                                }}
                                isValid={(valid) => this.setState({ nameCheck: valid })}
                                onSubmitEditing={() => this.focusNextField('email')}
                            />
                            <InputFieldComponent
                                name="Email"
                                validation={emailCheck}
                                keyboardType="email-address"
                                onChangeText={this.onChangeEmail}
                                onRef={(ref) => {
                                    this.inputs['email'] = ref;
                                }}
                                isValid={(valid) => this.setState({ emailCheck: valid })}
                                onSubmitEditing={() => this.focusNextField('password')}
                            />
                            <InputFieldComponent
                                name="Password"
                                validation={pwdCheck}
                                keyboardType="default"
                                onChangeText={this.onChangePwd}
                                secureTextEntry="Password"
                                isValid={(valid) => this.setState({ pwdCheck: valid })}
                                onSubmitEditing={() => this.focusNextField('repassword')}
                                onRef={(ref) => {
                                    this.inputs['password'] = ref;
                                }}
                            />
                            <InputFieldComponent
                                name="Re-type Password"
                                validation={pwdCheck}
                                keyboardType="default"
                                onChangeText={this.onChangeRePwd}
                                secureTextEntry="Password"
                                isValid={(valid) => this.setState({ repwdCheck: valid })}
                                onSubmitEditing={() => {
                                    if (this.state.nameCheck && this.state.emailCheck && this.state.pwdCheck && this.state.repwdCheck) {
                                        this.handlePress();
                                    }
                                }}
                                onRef={(ref) => {
                                    this.inputs['repassword'] = ref;
                                }}
                            />
                            <Button
                                title="Sign In"
                                onPress={this.handlePress}
                                disabled={
                                    this.state.nameCheck && this.state.emailCheck && this.state.pwdCheck && this.state.repwdCheck ? false : true
                                }
                                color="teal"
                            />
                            <View style={styles.options}>
                                <TouchableHighlight>
                                    <Text style={{ color: "white", marginLeft: "auto", marginRight: "auto" }} onPress={() => this.props.navigation.goBack()}>Already a User? Sign In</Text>
                                </TouchableHighlight>
                                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 15, marginLeft: "auto", marginRight: "auto" }}>{this.state.pwd !== this.state.rePwd && this.state.pwd !== "Password" && this.state.rePwd !== "Re-type Password" ? "Passwords do not match" : ""}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View >
        )
    }
}
class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioSelected: this.props.currentValue
        }
    }
    radioClick(id) {
        this.setState({
            radioSelected: id
        });
        this.props.salutationSelected(id);
    }
    render() {
        const products = [{
            id: 1,
            value: "Mr"
        },
        {
            id: 2,
            value: "Mrs"
        },
        {
            id: 3,
            value: "Miss"
        }];
        let productArray = [];
        products.map((val) => {
            productArray.push(
                <TouchableOpacity key={val.id} onPress={this.radioClick.bind(this, val.id)} style={{ flexDirection: "row", padding: 5 }}>
                    <View style={{
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 2
                    }}>
                        {
                            val.id == this.state.radioSelected ?
                                <View style={{
                                    height: 12,
                                    width: 12,
                                    borderRadius: 6,
                                    backgroundColor: '#000',
                                }} ></View>
                                : null
                        }
                    </View>
                    <Text style={{ paddingLeft: Dimensions.get("window").width / 100 * 2, fontSize: Dimensions.get("window").height / 100 * 3 }}>{val.value}</Text>
                </TouchableOpacity>
            );
        })
        return (
            <View>
                <View style={{ borderColor: "black", borderWidth: Dimensions.get("window").width / 100 * 0.5, padding: Dimensions.get("window").width / 100 * 1.5, flexDirection: "row" }}>
                    <Text style={{ fontSize: Dimensions.get("window").height / 100 * 3, width: Dimensions.get("window").width / 100 * 20, fontWeight: "bold" }}>Gender</Text>
                    <TouchableHighlight
                        onPress={() => {
                            this.props.setModalVisible(false);
                        }}
                        style={{ position: "absolute", right: 0, padding: Dimensions.get("window").width / 100 * 1, paddingRight: Dimensions.get("window").width / 100 * 3 }}>
                        <Text style={{ color: "red", fontSize: Dimensions.get("window").height / 100 * 3, fontWeight: "bold" }}>X</Text>
                    </TouchableHighlight>

                </View >
                <View style={{ borderColor: "black", borderWidth: 1 }}>
                    {productArray}
                </View>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    options: {
        width: Dimensions.get("window").width / 100 * 65,
        marginTop: 5
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop:60,
        marginLeft:"auto",
        marginRight:"auto",
        
    },
    pickerComponent: {
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        borderWidth: 2,
        borderBottomColor: "white",
        margin: 5

    }
})