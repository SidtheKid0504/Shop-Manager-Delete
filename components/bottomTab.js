import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import ShopDataScreen from '../screens/ShopDataScreen';
import ShopListScreen from '../screens/ShopListScreen';

export const BottomTabNavigator = createBottomTabNavigator({
    CreateList: {
        screen:ShopListScreen,
        navigationOptions: {
            tabBarLabel: "Create List"
        }
    },
    CreateList: {
        screen:ShopDataScreen,
        navigationOptions: {
            tabBarLabel: "Displayed List"
        }
    }
});


