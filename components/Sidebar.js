import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props} />
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              this.props.navigation.navigate('welcome');
              firebase.auth().signOut();
            }}>
            <Text
              style={{
                fontSize: RFValue(30),
                fontWeight: 'bold',
                marginLeft: RFValue(30),
              }}>
              Log Out
            </Text>
            <Icon
              name="logout"
              type="antdesign"
              size={RFValue(15)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    flex: 0.8,
  },
  logoutContainer: {
    flex:0.2,
    justifyContent:'flex-end',
  
  },
  logoutButton: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 0.75,
    marginTop: 30,
    width: '40%',
    height: '20%',
    borderRadius: 40,
    borderColor: '#000000',
  },
  drawerItemsContainer: {
    flex: 0.8,
  },
});

