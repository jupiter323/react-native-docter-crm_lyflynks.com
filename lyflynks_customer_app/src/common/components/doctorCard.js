import React from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import {
  colorSwatch,
  fontFamily,
  fontSize,
} from 'styles/Theme';


export default DoctorCard = props => {
  return (
    <View style={styles.descriptionContainer}>
      <Image source={require('../assets/images/doctor-01.png')} style={styles.image}/>
      <View>
        <Text style={[styles.doctorName]}>{ props.capitalizeText(props.who)}</Text>
        <Text style={[styles.doctorSpeciality]}>{props.capitalizeText(props.specialty)}</Text>
        <Text style={[styles.doctorName]}>{props.capitalizeText(props.for_who)} / Elder</Text>
      </View>
     </View>
  )
}

const styles = StyleSheet.create({
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 50
  },
  image:{
    width: 25,
    height: 25,
    borderRadius: 12
  },
  textDescription: {
    marginLeft: 25,
    fontSize: fontSize.normal,
    color: colorSwatch.dustyGray,
    fontFamily: fontFamily.medium
  },
  doctorName: {
    fontSize: fontSize.medium,
    paddingLeft: 15,
    color: colorSwatch.codGray,
    fontFamily: fontFamily.medium,
  },
  doctorSpeciality: {
    fontSize: fontSize.normal,
    paddingLeft: 15,
    color: colorSwatch.dustyGray,
    fontFamily: fontFamily.medium,
  },
})