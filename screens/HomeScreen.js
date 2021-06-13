import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MyHeader from '../components/Header';
import {RFValue} from 'react-native-responsive-fontsize';

export default class HomeScreen extends React.Component{
  render() {
    return(
      <View style={{flex: 1, backgroundColor: '#31DF86'}}>
          <MyHeader title="Home"/>
          <View style={styles.innerContainer}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                  style={styles.navButtons} 
                  onPress = {() => {
                    this.props.navigation.navigate('Shop_List_Screen')
                  }}
                >
                    <Text style={styles.navButtonText}>Shopping List</Text>                  
                </TouchableOpacity>
                <Image 
                    source={require("../assets/list.png")}
                    style={{width: RFValue(100), height:RFValue(100)}}
                />
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                  style={[styles.navButtons, {marginTop: RFValue(50)}]} 
                  onPress = {() => {
                    this.props.navigation.navigate('Shop_Data_Screen')
                  }}
                >
                    <Text style={styles.navButtonText}>Shopping Data</Text>
                </TouchableOpacity>
                <Image 
                    source={require("../assets/money_data.png")}
                    style={{width: RFValue(100), height:RFValue(100), marginTop: RFValue(45), alignSelf: 'center'}}
                />
            </View>

          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    innerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    navButtons: {
      width: '75%',
      height: RFValue(60),
      backgroundColor: '#12CDD4',
      borderColor: '#FFFFFF',
      borderWidth: 0.5,
      borderRadius: RFValue(10),
      alignItems: 'center',
      justifyContent: 'center',
      padding: RFValue(40)
    },
    navButtonText: {
      fontSize: RFValue(25),
      color: '#FFFFFF',
      fontFamily: "Proxima Nova"
    }
})