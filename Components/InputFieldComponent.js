import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';

export default class InputFieldComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTextInputFocus: false,
            textInput: this.props.name,
            textInputColor: "",

        }
        this.onChangeTextInput = this.onChangeTextInput.bind(this);

    }
    componentDidMount() {
        if (this.props.onRef != null) {
            this.props.onRef(this)
        }
    }
    focus() {
        this.textInput.focus();
    }
    onChangeTextInput(text) {
        this.setState({ textInput: text });
        if (this.props.validation) {
            let inputCheck = this.props.validation;
            if (inputCheck.test(text)) {
                this.setState({ textInputColor: "green" })
                this.props.isValid(true);
            }
            else {
                this.setState({ textInputColor: "red" });
                this.props.isValid(false);
            }
        }
        else{
            this.setState({textInputColor:"green"});
            this.props.isValid(true);
        }
        this.props.onChangeText(text);

        
    }
    onSubmitEditing() {
        this.props.onSubmitEditing();
    }
    render() {
        return (
            <View style={styles.rowContainer}>
                <Text style={{ color: "white" }}>{this.state.isTextInputFocus ? this.props.name : ""}</Text>
                <TextInput
                    ref={(input) => { this.textInput = input }}
                    style={[styles.inputContainer, (this.state.textInputColor === "red" ? styles.activateError : (this.state.textInputColor ? styles.activateAccept : styles.default))]}
                    onChangeText={text => this.onChangeTextInput(text)}
                    value={this.state.textInput}
                    keyboardType={this.props.keyboardType}
                    onFocus={() => {
                        if (this.state.textInput === this.props.name)
                            this.setState({ isTextInputFocus: true, textInput: "" })
                        else
                            this.setState({ isTextInputFocus: true })
                    }}
                    onBlur={() => {
                        if (!this.state.textInput) {
                            this.setState({ isTextInputFocus: false, textInput: this.props.name })
                        }

                    }}
                    secureTextEntry={this.props.name === "Password" || this.props.name==="Re-type Password" ? (this.state.textInput === "Password" || this.state.textInput==="Re-type Password" ? false : true) : false}
                    onSubmitEditing={this.onSubmitEditing.bind(this)}
                >

                </TextInput>
            </View>
        )
    }
}
const styles = StyleSheet.create({
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
    }
})