import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MyHeader from '../components/Header';
import {RFValue} from 'react-native-responsive-fontsize';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {BottomTabNavigator} from '../components/bottomTab';
import db from '../config';
import firebase from 'firebase';

export default class ShopListScreen extends React.Component{
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      title: '',
      item: '',
      price: '',
      listItems: [],
      numOfItems: 0,
      totalPrice: 0
    }
  }
  render() {
    return(
      <View style={styles.container}>
          <MyHeader title="Shopping List"/>
          <View style={styles.inputContainer}>
            <TextInput 
              style= {styles.listNameInput}
              onChangeText={(text) => {
                this.setState({
                  title: text
                });
              }
            }
            value= {this.state.title}
            placeholder= "My Own List"
            />

            <View style={styles.addItemContainer}>
              <TextInput 
                style={styles.addInput}
                onChangeText={(text) => {
                  this.setState({
                    item: text
                  });
                }}
                value= {this.state.item}
                placeholder= "Input Item"
              />

              <TextInput 
                style={styles.addInput}
                keyboardType= {"numeric"}
                onChangeText={(text) => {
                  this.setState({
                    price: parseInt(Math.round(text))
                  });
                }}
                value= {this.state.price}
                placeholder= "Input Item Price"
              />
            </View>
            <TouchableOpacity
                style={styles.submitItemButton}
                onPress={() => {
                  this.addItem();
                }}
            >
              <Text style={styles.submitItemText}>Add Item</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <TouchableOpacity
                  style={styles.submitListButton}
                  onPress={() => {
                    this.submitList();
                  }}
              >
                <Text style={styles.submitListText}>Finish List</Text>
              </TouchableOpacity>
          </View>
        {/* <AppContainer /> */}
      </View>
    )
  }


  addItem = () => {
    this.state.numOfItems++;
    this.state.listItems.push({item: this.state.item, price: this.state.price})
    console.log(this.state.listItems);

    this.state.totalPrice += this.state.price;
    console.log(this.state.totalPrice);

    this.setState({
      item: '',
      price: ''
    });
  }

  submitList= () => {
    db.collection('shoppingLists').add({
      userID: this.state.userID,
      title: this.state.title,
      listItems: this.state.listItems,
      totalPrice: this.state.totalPrice,
      totalNumItems: this.state.numOfItems,
      listTime: new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString()
    });
    this.setState({
      title: '',
      listItems: [],
      totalPrice: 0,
      numOfItems: 0
    })
  }
}

// const SwitchNavigator = createSwitchNavigator({
//   CreateList: {screen:ShopListScreen},
//   TabNavigator: {screen:BottomTabNavigator}
// });

// const AppContainer = createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#31DF86',
    },
    inputContainer: {
      flex: 1,
      alignItems: 'center',
    },
    listNameInput: {
      width: '75%',
      height: RFValue(20),
      borderBottomWidth: 0.5,
      borderBottomColor: '#FFFFFF',
      marginTop: 20,
      fontSize: RFValue(15),
      fontWeight: 'bold'
    },
    addItemContainer: {
      flexDirection: 'row',
      margin: RFValue(20)
    },
    addInput: {
      width: RFValue(150),
      height: RFValue(30),
      borderWidth: 0.5,
      borderColor: 'black',
      fontSize: RFValue(5),
      marginLeft: RFValue(20),
      marginRight: RFValue(20),
      alignContent: 'center',
      textAlign: 'center',
      fontSize: RFValue(15),
      fontWeight: 'bold'
    },
    submitItemButton: {
      width: RFValue(150),
      height: RFValue(20),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: RFValue(0.5),
      borderRadius: RFValue(15),
      marginBottom: RFValue(20),
      backgroundColor: '#FFD700',
    },
    listContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitItemText: {
      fontWeight: 'bold',
      fontSize: RFValue(10),
    },
    submitListButton: {
      width: RFValue(300),
      height: RFValue(40),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: RFValue(0.5),
      borderRadius: RFValue(15),
      borderColor: 'white',
      marginBottom: RFValue(20),
      backgroundColor: '#12CDD4',
    },
    submitListText: {
      fontWeight: 'bold',
      fontSize: RFValue(10),
      fontFamily: "Proxima Nova",
      color: 'white'
    },
})