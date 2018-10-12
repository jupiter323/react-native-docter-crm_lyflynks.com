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
    bottom:-37, 
    right:140, 
    position: 'absolute', 
    zIndex: 100,
    width:24,
    height:24
    
  }, 
   
});