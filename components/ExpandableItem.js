import React, { Component } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import db from '../config';
import firebase from 'firebase';
 
export default class ExpandableItem extends Component {

  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  deleteItem = async(item) => {
    await db.collection('shoppingLists').where("userID", "==", firebase.auth().currentUser.email)
    .onSnapshot((snapshot) => {
        let shopLists = snapshot.docs.map((doc) => doc.data());   
        for (var i=0; i<shopLists.length; i++) {
          if (this.props.key == i.title) {
            console.log(this.props.key, i.title)
            // i.listItems.delete(item)
          }
        }
        // db.collection('shoppingLists').doc(doc.id).update({
        //   listItems: shopLists
        // })
    });
  }

  render() {
    return (
      <View style={{marginBottom:RFValue(10)}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={[styles.headerText, {textDecorationLine: "underline"}]}>{this.props.item.title}</Text>
          <Text style={styles.text}>Total Price: ${this.props.item.totalPrice} </Text>
          <Text style={styles.text}>Total Number of Items: {this.props.item.totalNumItems} </Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          
          
            <View
              style={styles.content}
            >
              <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}}>
                <Row data={["Item Name", "Item Price"]} style={styles.headStyle} textStyle={styles.tableText}/>
                {this.props.item.listItems.map((item, key) => (
                  <View>
                    <Row data={[item.item, `$${item.price}`]} style={styles.dataStyle} textStyle={styles.tableText}/>
                    <TouchableOpacity
                      onPress={()=>{
                        this.deleteItem(key)
                      }}
                    >
                      <Text>Delete Item</Text>
                    </TouchableOpacity>
                  </View>
                  
                ))}
              </Table>
            </View>
            
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      backgroundColor: '#12CDD4',
    },
    topHeading: {
      paddingLeft: 10,
      fontSize: 20,
    },
    header: {
      backgroundColor: '#12CDD4',
      padding: 16,
    },
    headerText: {
      fontSize: 16,
      fontWeight: '500',
    },
    separator: {
      height: 0.5,
      backgroundColor: '#808080',
      width: '95%',
      marginLeft: 16,
      marginRight: 16,
    },
    text: {
      padding: 10,
      fontWeight: 'bold',
      fontSize: RFValue(10)
    },
    content: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    headStyle: { 
      height: 50,
      alignContent: "center",
      backgroundColor: '#FFD700'
    },
    dataStyle: { 
      height: 50,
      alignContent: "center",
      backgroundColor: '#95e8ff'
    },
    tableText: { 
      margin: 10
    }
  });