import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import ShopDataScreen from './screens/ShopDataScreen';
import ShopListScreen from './screens/ShopListScreen';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import {AppContainer} from './components/SwitchNavigators';

export default class App extends React.Component{
  render() {
    return(
      <View style={styles.container}>
        <AppContainer />
        
      </View> 
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 8,
  },
});


