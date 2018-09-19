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
	  View,
	  Button,
	  AsyncStorage,
	  TouchableOpacity
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



	const stateMap = (store) => {
		const { upcoming } = store.activities;
	  return {upcoming};
	};

	class ActivityLogTimeline extends Component {
	  constructor(props){
		super(props)
		this.onEventPress = this.onEventPress.bind(this);
		this.renderDetail = this.renderDetail.bind(this);
		this.renderSelected = this.renderSelected.bind(this);
		let data = this.props.data.slice();
		data.forEach((record, index) => {
		  // record.taskId = (new Date().getTime()) + "." + index;
		  record.taskId = record.for_who + '$' + record.href;
		  record.status = 'U';
		});
		this.state = {'data': data, 'tasks': {}};
	  }

	  componentDidMount(){
		let _this = this;
		AsyncStorage.getItem('TASKS').then(function(tasks){
		  if (tasks == null) { 
			  tasks = {};
		  } else {
			  tasks = JSON.parse(tasks);
      }
      let state = {};
		  state.data = (_this.state || {}).data;
      state.tasks = tasks;
          _this.setState(state);
		});
	  }

	  renderSelected(){
		  if(this.state.selected)
			return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
	  }

	  capitlizeText = (word) => {
	  return word.replace(
		  /\w\S*/g,
		  txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		);
	  }
	   onEventPress(event, taskId, status){
		  var data = this.state.data.slice();
		var record = data.filter(rec => rec.taskId === taskId)[0];
		var tasks = this.state.tasks || {};
		  if (event === 'showdismiss') {
			  record.showReadDismissView = (status != 'close');
		  } else if (event === 'statuschange'){
		  record.status = status;
		  record.showReadDismissView = false;
		  tasks = Object.assign({}, tasks);
		  tasks[taskId] = status;
		  this.updateTaskMap(tasks);
		  }
      
      
		  this.setState({data : data, 'tasks': tasks});
	  }

	  updateTaskMap(taskMap) {
		AsyncStorage.setItem('TASKS', JSON.stringify(taskMap)).then(() => {});
	  }

	  renderDetail(rowData, sectionID, rowID) {
		let activity_icon = null;
		let iconColor = '#55ff55';
		if (rowData.status == 'R') {
		  iconColor = '#777777';
		}
		switch (rowData.type) {
		  case 'medical_appointment':
			activity_icon = <HealthIcon color={iconColor} style={{width: 16, height: 16 }} />
			break;
		  case 'transportation':
			activity_icon = <TransportIcon color={iconColor} style={{ width: 16, height: 16 }} />
			break;
		  case 'lawn_service':
			activity_icon = <CompanionIcon color={iconColor} style={{ width: 16, height: 16 }} />
			break;
		  case 'medical_appointment':
			activity_icon = <MemberIcon color={iconColor} style={{width: 16, height: 16 }} />
			break;
		  case 'medication':
			activity_icon = <EmergencyIcon color={iconColor} style={{ width: 16, height: 16 }} />
			break;
		  case 'medical appointment':
			activity_icon = <HealthIcon color={iconColor} style={{width: 16, height: 16 }} />
			break
		  case 'lawncare':
			activity_icon = <CompanionIcon color={iconColor} style={{ width: 16, height: 16 }} />
			break;
		  case 'emergency':
			activity_icon = <EmergencyIcon color={iconColor} style={{ width: 16, height: 16 }} />
			break;
		  case 'check in':
			activity_icon = <CompanionIcon color={iconColor} style={{ width: 16, height: 16 }} />
			break;
		  default:
			activity_icon = <CompanionIcon color={iconColor} style={{ width: 16, height: 16 }} />
		}

		
		let title = null;
		let desc = null;
		if (rowData.showReadDismissView) {
		  title = (
			<View style={styles.activityTitleContainer}>
			  <View style={styles.activityTitleIcon}>
			  </View>
			</View>
		  );
		  desc = (
			<View style={{flex:1}}>
			  <View style={{flex:0.5, padding:10}}>
				<Button onPress={this.onEventPress.bind(this, 'statuschange', rowData.taskId, 'R')} title='Read' color = {'#00A68C'} /> 
			  </View>
			  <View style={{flex:0.5, padding:10}}>
				<Button onPress={this.onEventPress.bind(this, 'statuschange', rowData.taskId, 'D')} title='Dismiss' color = {'#00A68C'}/>
			  </View>
			</View>
      )
      if (rowData.status == 'R') {
          desc = (
            <View style={{flex:1}}>
              <View style={{flex:0.5, padding:10}}>
              <Button onPress={this.onEventPress.bind(this, 'statuschange', rowData.taskId, 'U')} title='Unread' color = {'#00A68C'} /> 
              </View>
              <View style={{flex:0.5, padding:10}}>
              <Button onPress={this.onEventPress.bind(this, 'statuschange', rowData.taskId, 'D')} title='Dismiss' color = {'#00A68C'}/>
              </View>
            </View>
            )
      }
		  
		  return (		
			  <View style={{flex:1}} className={rowData.status == 'D' ? 'displayHidden' : (rowData.status == 'R' ? 'borderGray' : '')}>
				{title}
				{desc}
			  </View>
			)
		} else {
		  title = (
			  <View style={styles.activityTitleContainer} >
				<View style={styles.activityTitleIcon}>
				  { activity_icon }
				  <Text style={styles.title}>{this.capitlizeText(rowData.type)}</Text>
				</View>
				<View style={styles.activityTitleDatetime}>
				  <Text style={styles.date}>{(rowData.date || '') + '/' + (rowData.time || '')}</Text>
				</View>
			  </View>
		  );

		  if (rowData.status == 'R') {
			title = (
				<View style={styles.activityTitleContainer} >
				  <View style={styles.activityTitleIcon}>
					{ activity_icon }
					<Text style={styles.titleGray}>{this.capitlizeText(rowData.type)}</Text>
				  </View>
				  <View style={styles.activityTitleDatetime}>
					<Text style={styles.dateGray}>{(rowData.date || '') + '/' + (rowData.time || '')}</Text>
				  </View>
				</View>
			);
		  }

		  desc = (
			<View style={styles.descriptionContainer}>
			  <View>
				<Text style={[styles.textDescription]}>{rowData.description}</Text>
			  </View>
			</View>
		  )
		  if (rowData.description && (rowData.type == 'medical_appointment' || rowData.type === 'medical_appointment' )) {
			desc = (
			  <View style={styles.descriptionContainer}>
				<Image source={require('../assets/images/doctor-01.png')} style={styles.image}/>
				<View>
				  <Text style={[styles.doctorName]}>{rowData.who}</Text>
				  <Text style={[styles.doctorSpeciality]}>{rowData.specialty}</Text>
				  <Text style={[styles.doctorName]}>{rowData.for_who} / Elder</Text>
				</View>
			  </View>
			)
		  }
		  return (
				<TouchableOpacity onPress={this.onEventPress.bind(this, 'showdismiss', rowData.taskId)}>
				  <View style={{flex:1}}>
					{title}
					{desc}
				  </View>
				</TouchableOpacity>
			)
		}
	  }

	  render() {
		let data = this.state.data.slice();
		let tasks = this.state.tasks || {};
		let visibleData = [];
		data.forEach((record, index) => {
		  record.status = tasks[record.taskId] || 'U';

		  if (record.status != 'D') {
			visibleData.push(record);
		  }
    });
    
    
		return (
		  <View style={styles.container}>
			{/* {this.renderSelected()} */}
			<Timeline
			  style={styles.list}
			  data={visibleData}
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
		paddingTop: 0,
		color: colorSwatch.codGray,
		fontFamily: fontFamily.medium,
	  },
	  date:{
		fontSize: fontSize.small,
		color: colorSwatch.codGray,
		fontFamily: fontFamily.medium,
	  },
	  titleGray:{
		fontSize: fontSize.medium,
		paddingLeft: 8,
		color: colorSwatch.dustyGray,
		fontFamily: fontFamily.medium,
	  },
	  dateGray:{
		fontSize: fontSize.small,
		color: colorSwatch.dustyGray,
		fontFamily: fontFamily.medium,
	  },
	  activityTitleContainer:{
		flex: 1,
		flexDirection: 'row',
		paddingRight: 15,
		paddingTop: 0,
		marginTop: 0,
	  },
	  activityTitleIcon: {
		flex: 3,
		width: 16,
		flexDirection: 'row',
		alignItems: 'flex-start',
	  },
	  icon: {
		width: 10,
		height: 10,

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

	export default connect(stateMap)(ActivityLogTimeline);