import React from 'react'; 
import {
  View,
  StyleSheet,
  Image
} from "react-native";

const ImageButton = () => (
  <View> 
    <Image source={require('images/forwardIcon.png')} style={styles.btnIcon} />
  </View>
);

export default ImageButton;
 
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