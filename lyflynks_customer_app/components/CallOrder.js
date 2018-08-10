import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {
  deviceWidth,
  deviceHeight,
  colorSwatch,
  fontFamily,
  fontSize,
} from '../styles/Theme';
import {FontAwesome} from '@expo/vector-icons'
const capilizeWords = (word) => {
  if (word) {
    return word.replace(
      /\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
}

export default ElementCall = props => {
  let fullname = `${props.ll_member.fname} ${props.ll_member.lname}`
 return (
   <View style={[styles.container]}>
    <View style={{ justifyContent: 'center', }}>
      <Image style={styles.image} source={require('../assets/images/default-avatar.png')} />
    </View>
    <View style={styles.containerText}>
      <Text style={styles.text}>{capilizeWords(fullname)}</Text>
      <Text style={[styles.text, styles.role]}>{capilizeWords(props.roles[0])}</Text>
    </View>
    <View style={{ justifyContent: 'center' }}>
      <FontAwesome name='sort'  size={30} color={colorSwatch.persianGreen}/>
    </View>
  </View>
 )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa'
  },
  image: {
    width: 40,
    height: 40,
  },
  containerText: {
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1,
  },
  text:  {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.medium,
    color: colorSwatch.codGray,
  },
  role: {
    fontFamily: fontFamily.light,
    fontSize: fontSize.normal,
    color: colorSwatch.dustyGray
  }
})