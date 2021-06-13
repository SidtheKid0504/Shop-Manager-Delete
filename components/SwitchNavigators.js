import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import ShopDataScreen from '../screens/ShopDataScreen';
import ShopListScreen from '../screens/ShopListScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import {DrawerNavigator} from './DrawNavigator';

const SwitchNavigator = createSwitchNavigator({
    welcome: WelcomeScreen,
    drawer: DrawerNavigator
});
export const AppContainer = createAppContainer(SwitchNavigator);