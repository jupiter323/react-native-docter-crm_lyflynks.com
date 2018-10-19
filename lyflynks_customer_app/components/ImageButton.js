import React, { Component } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  KeyboardAvoidingView,
  Image
} from "react-native";
import {Button } from "react-native-elements";

export default class ImageButton extends React.Component {

  render() {
    return (
        <View> 
          <Image source={require('../assets/images/forwardIcon.png')} style={styles.btnIcon} />
        </View>  
      )
    } 
}
 
const styles = StyleSheet.create({
 
  btnIcon:{  
    right:'35%',
    position: 'absolute', 
    zIndex: 100,
    width:24,
    height:24,
    top:14
  }, 

  nextBtn:{
    borderRadius: 10,
    shadowOpacity: 5, 
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5, 
    elevation: 10,
  }
   
});