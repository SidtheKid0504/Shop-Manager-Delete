import React from 'react';
import MyHeader from '../components/Header';
import { StyleSheet, Text, View, FlatList, TextInput, LayoutAnimation, UIManager, TouchableOpacity, Platform, ScrollView } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import { ListItem, Icon} from 'react-native-elements';
import ExpandableItem from '../components/ExpandableItem';
import db from '../config';
import firebase from 'firebase';

export default class ShopDataScreen extends React.Component{
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      userID: firebase.auth().currentUser.email,
      allLists: [],
      isArrowPressed: false,
      requestedListName: "",
      resultList: [],
      layoutHeight: 0
    }
  }

  componentDidMount() {
    this.getAllLists();
  }

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.allLists];
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false)
    );
    this.setState(() => {
      return {
        allLists: array,
      };
    });
  };  

  render() {
    return(
      <View style={styles.container}>
          <MyHeader title="Shopping Data"/>
          <View style= {styles.searchListContainer}>
            <TextInput 
              style={styles.searchList}
              placeholder="Search for List"
              onChangeText={(text) => {
                this.setState({
                  requestedListName: text
                });
                this.findInputLists();
              }}
              value={this.state.requestedListName}
            /> 
          </View>
          <ScrollView>
            {this.state.resultList.map((item, key) => (
              <ExpandableItem
                key={item.title}
                onClickFunction={this.updateLayout.bind(this, key)}
                item={item}
              />
            ))}
          </ScrollView>
      </View>
    )
  }

  getAllLists = async() => {
    await db.collection('shoppingLists').where("userID", "==", this.state.userID)
    .onSnapshot((snapshot) => {
      let shopLists = snapshot.docs.map((doc) => doc.data());   
      if (shopLists != undefined) {
        this.setState({
          allLists: shopLists
        });
        this.setState({
          resultList: this.state.allLists
        });
      }
    });
}

  findInputLists = async() => {
    if (this.state.requestedListName === "" || this.state.requestedListName === null) {
      this.setState({
        resultList: this.state.allLists
      });
      return 
    }
    this.setState({
      resultList: await this.state.allLists.filter((eachItem) => {
        if (eachItem.title === this.state.requestedListName) {
          let result = eachItem.title
          console.log(result)
          return result
        }
        return false
      })});
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#31DF86'
    },
    searchListContainer: {
      flexDirection: 'row'
    },
    searchList: {
      width: '75%',
      height: RFValue(20),
      borderBottomWidth: RFValue(0.5),
      marginBottom: RFValue(10),
      borderBottomColor: '#FFFFFF',
      marginTop: RFValue(20),
      fontSize: RFValue(15),
      fontWeight: 'bold'
    }
})