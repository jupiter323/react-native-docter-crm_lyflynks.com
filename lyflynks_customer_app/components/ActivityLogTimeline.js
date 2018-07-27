/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import {
  EmergencyIcon,
  TransportIcon,
  HealthIcon,
  CompanionIcon,
  MemberIcon
} from './icons';

import {
  deviceWidth,
  deviceHeight,
  colorSwatch,
  fontFamily,
  fontSize,
} from '../styles/Theme';


import Timeline from '../components/styleguide/TimeLine';
import { connect } from 'react-redux'
@connect(store => {
  const { upcoming } = store.activities;
  return {upcoming};
})
export default class ActivityLogTimeline extends Component {
  constructor(){
    super()
    this.onEventPress = this.onEventPress.bind(this)
    this.renderSelected = this.renderSelected.bind(this)
    this.renderDetail = this.renderDetail.bind(this)
    this.state = {selected: null}
  }

  onEventPress(data){
    this.setState({selected: data})
  }

  renderSelected(){
      if(this.state.selected)
        return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
  }

  renderDetail(rowData, sectionID, rowID) {
    let activity_icon = null;

    switch (rowData.type) {
      case 'medical_appointment':
        activity_icon = <HealthIcon style={{ width: 16, height: 16 }} />
        break;
      case 'transportation':
        activity_icon = <TransportIcon style={{ width: 16, height: 16 }} />
        break;
      case 'lawn_service':
        activity_icon = <CompanionIcon style={{ width: 16, height: 16 }} />
        break;
      case 'medical_appointment':
        activity_icon = <MemberIcon style={{ width: 16, height: 16 }} />
        break;
      case 'medication':
        activity_icon = <EmergencyIcon style={{ width: 16, height: 16 }} />
        break;
      case 'medical appointment':
        activity_icon = <HealthIcon style={{ width: 16, height: 16 }} />
        break
      case 'lawncare':
        activity_icon = <CompanionIcon style={{ width: 16, height: 16 }} />
        break;
      case 'emergency':
        activity_icon = <EmergencyIcon style={{ width: 16, height: 16 }} />
        break;
      case 'check in':
        activity_icon = <CompanionIcon style={{ width: 16, height: 16 }} />
        break;
      default:
        activity_icon = <CompanionIcon style={{ width: 16, height: 16 }} />
    }

    let title = (
      <View style={styles.activityTitleContainer}>
        <View style={styles.activityTitleIcon}>
          { activity_icon }
          <Text style={[styles.title]}>{rowData.title || rowData.type}</Text>
        </View>
        <View style={styles.activityTitleDatetime}>
          <Text style={[styles.date]}>{rowData.date + '/' + rowData.time}</Text>
        </View>
      </View>
    )
    var desc = null
    if (rowData.description && (rowData.type == 'medical_appointment' || rowData.type === 'medical_appointment' )) {
      desc = (
        <View style={styles.descriptionContainer}>
          <Image source={rowData.imageUrl} style={styles.image}/>
          <View>
            <Text style={[styles.doctorName]}>{rowData.doctor_appointment.name}</Text>
            <Text style={[styles.doctorSpeciality]}>{rowData.doctor_appointment.details}</Text>
            <Text style={[styles.doctorName]}>{rowData.doctor_appointment.elder}</Text>
          </View>
        </View>
      )
    } else {
      desc = (
        <View style={styles.descriptionContainer}>
          <View>
            <Text style={[styles.textDescription]}>{rowData.description}</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {this.renderSelected()} */}
        <Timeline
          style={styles.list}
          data={this.props.upcoming.data}
          circleSize={15}
          circleColor={colorSwatch.persianGreen}
          lineColor={colorSwatch.silverSand}
          timeContainerStyle={{minWidth:0, marginTop: 0}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:0, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:0}
          }}
          innerCircle={'dot'}
          separator={true}
          dotColor={colorSwatch.persianGreen}
          onEventPress={this.onEventPress}
          showTime={false}
          renderDetail={this.renderDetail}
          enableEmptySections
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
	  paddingTop: 0,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:0,
    padding: 15,
    paddingLeft: 0
  },
  title:{
    fontSize: fontSize.medium,
    paddingLeft: 8,
    color: colorSwatch.codGray,
    fontFamily: fontFamily.medium,
  },
  date:{
    fontSize: fontSize.small,
    color: colorSwatch.dustyGray,
    fontFamily: fontFamily.medium,
  },
  activityTitleContainer:{
    flex: 1,
    flexDirection: 'row',
    paddingRight: 15
  },
  activityTitleIcon: {
    flex: 3,
    width: 16,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  activityTitleType: {
    flex: 3,
    alignItems: 'flex-start'
  },
  activityTitleDatetime: {
    flex: 1,
    alignItems: 'flex-end'
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 50
  },
  image:{
    width: 50,
    height: 50,
    borderRadius: 25
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
});