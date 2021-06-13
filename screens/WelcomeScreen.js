import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    Modal, 
    KeyboardAvoidingView,
    ScrollView ,
    Image
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailID: "",
            password: "" ,
            confirmPassword: "",
            lastName: "",
            firstName: "",
            isModalVisible: false,
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                </View>
                    {
                        this.showModal()
                    }
                    
                <View style={styles.profileContainer}>
                    <Text style={styles.titleText}>The Shop Manager</Text>
                    <Image 
                      source={require("../assets/shopping-cart.png")}
                      style={{width: RFValue(50), height:RFValue(50), alignItems: "center"}}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput
                        onChangeText={(text) => {
                            this.setState({
                                emailID: text
                            });
                        }}
                        placeholder="abc@123.com"
                        placeholderTextColor="#00008B"
                        style={styles.loginInput}
                        keyboardType="email-address"
                    />

                    <TextInput
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            });
                        }}
                        placeholder="Password"
                        placeholderTextColor="#00008B"
                        style={styles.loginInput}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.login(this.state.emailID, this.state.password);
                        }}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.button}
                        onPress= {() => 
                            this.setState({
                                isModalVisible: true
                            })
                        }
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    signUp = (email, password, confirm) => {
        if (password === confirm) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.collection("users").add({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    password: password,
                    email: email,
                                
                })
            })
        } else {
            return Alert.alert("Passwords Don't Match\n Check Your Password") 
        }
    }

    login = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
           this.props.navigation.navigate("Home")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return(Alert.alert(errorMessage));
        
        });
    }

    showModal = () => {
        // alert(this.state.isModalVisible)
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={{flex:1}}>
                        <KeyboardAvoidingView style={styles.keyBoardAvoidView}>
                            <Text style={styles.modalTitle}>Registration</Text>
                            <Text style={styles.labelStyle}>First Name</Text>
                            <TextInput 
                                placeholder= {"First Name"}
                                maxLength= {8}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        firstName: text
                                    })
                                }}
                            />
                            <Text style={styles.labelStyle}>Last Name</Text>
                            <TextInput 
                                placeholder= {"Last Name"}
                                maxLength= {13}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        lastName: text
                                    })
                                }}
                            />

                            <Text style={styles.labelStyle}>Email</Text>
                            <TextInput 
                                placeholder= {"abc@123.com"}
                                keyboardType={"email-address"}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        emailID: text
                                    })
                                }}
                            />
                            <Text style={styles.labelStyle}>Password</Text>
                            <TextInput 
                                placeholder= {"Password"}
                                secureTextEntry= {true}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text
                                    })
                                }}
                            />

                            <Text style={styles.labelStyle}>Confirm Password</Text>
                            <TextInput 
                                placeholder= {"Confirm Password"}
                                secureTextEntry= {true}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        confirmPassword: text
                                    })
                                }}
                            />
                            <View style= {{flex:0.2, alignItems: "center"}}>
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() => {
                                        this.signUp(this.state.emailID, this.state.password, this.state.confirmPassword)
                                    }}
                                >   
                                    <Text style={styles.formButtonText}>Register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style= {styles.cancelButton}
                                    onPress= {() => {
                                        this.setState({
                                            isModalVisible: "false"
                                        });
                                    }}
                                >
                                    <Text style={styles.formButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#31DF86',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 65,
        fontWeight: "300",
        color: '#FFFFFF',
        paddingBottom: 30
    },
    loginInput: {
        width: 300,
        height: 50,
        borderColor: '#000000',
        backgroundColor: '#12CDD4',
        margin: 10,
        paddingLeft: 10,
        borderWidth: 2
    },
    button: {
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 25,
        margin: 10,
        backgroundColor: '#95e8ff'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
         borderRadius: 20,
         backgroundColor: "#12CDD4",
         marginRight: 30,
         marginLeft: 30,
         marginTop: 80,
         marginBottom: 80
    },
    modalTitle: {
        justifyContent: "center",
        alignSelf: "center", 
        fontSize: 30,
        color: "#062926",
        margin: 50
    },
    keyBoardAvoidView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerTextInput: {
        width: "90%",
        height: RFValue(30),
        alignSelf: "center", 
        borderColor: "#012a42",
        borderWidth: 0.7,
        borderRadius: 10,
        marginBottom: RFValue(20),
        marginLeft: RFValue(3),
        padding: 10
    },
    registerButton: {
        width: RFValue(75),
        height: RFValue(20),
        alignItems: "center", 
        justifyContent: 'center',
        borderWidth: 1.5,
        borderRadius: 10,
        marginTop: RFValue(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16
    },
    cancelButton: {
        width: "75%",
        height: RFValue(10),
        alignItems: "center", 
        justifyContent: 'center',
        borderWidth: 1.5,
        borderRadius: 10,
        marginTop: RFValue(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
    },
    formButtonText: {
        alignSelf: "center",
    }
});
  