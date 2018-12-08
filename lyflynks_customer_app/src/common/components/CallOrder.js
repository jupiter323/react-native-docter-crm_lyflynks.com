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
} from 'styles/Theme';
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
  var avatarPath = '../assets/images/default-avatar.png'  
  return (
    <View style={props.isLast ? styles.container : [styles.container, { marginRight: 20 }]}>
      <View style={{ justifyContent: 'center', }}>
        <Image style={styles.image} source={require(avatarPath)} />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>{capilizeWords(fullname)}</Text>
        <Text style={[styles.text, styles.role]}>{capilizeWords(props.roles[0])}</Text>
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
    borderBottomColor: '#aaa',
  },
  image: {
    width: 40,
    height: 40,
  },
  rightIcon: {
    marginRight: 20
  },
  containerText: {
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1,
  },
  text: {
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