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
	} from 'styles/Theme';

	import moment from 'moment';


	import Timeline from './TimeLine';
	import { connect } from 'react-redux'
	import _ from 'lodash'


	const stateMap = (store) => {
		const { upcoming } = store.activities;
	  return {upcoming};
	};

	class ActivityLogTimeline extends Component {
	  constructor(props){
		super(props)
		this.renderDetail = this.renderDetail.bind(this);
		this.renderSelected = this.renderSelected.bind(this);
		this.onRowPress = this.onRowPress.bind(this);
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

	  renderTitle = (word) => {
			return word.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) {
				return key.toUpperCase()
				}
			);
	  }

	  updateTaskMap(taskMap) {
			AsyncStorage.setItem('TASKS', JSON.stringify(taskMap)).then(() => {});
		}

		onRowPress = (data) => {
			if (data.type === 'check_in') {
				this.props.navigation.navigate('CheckInDetailsScreen', { id: data.id });
			}
		}

		renderWhen(date) {
			if (date == 'TBD') {
				return date;
			}

			return moment(date).format('MMMM D/h:mma');
		}

	  renderDetail(rowData, sectionID, rowID) {
			let iconColor = '#55ff55';
			if (rowData.status == 'R') {
			  iconColor = '#777777';
			}

		  let title = (
			  <View style={styles.activityTitleContainer} >
					<View>
					  <Text style={styles.title}>{this.renderTitle(rowData.type)}</Text>
					</View>
					<View style={styles.activityTitleDatetime}>
					  <Text style={styles.date}>{this.renderWhen(rowData.when)}</Text>
					</View>
			  </View>
	  );

			let forWhoItems = [];
			let whoString = _.toArray(rowData.who).join(', ');

			_.each(_.toArray(rowData.for_who), function(value, index) {
				forWhoItems.push(<Text style={[styles.doctorName]} key={index}>{value} / Elder</Text>);
			});

		  if (forWhoItems.length > 0) {
				desc = (
				  <View style={styles.descriptionContainer}>
						<View>
							{forWhoItems}
							<Text style={[styles.doctorName]} key='for-who'>With {whoString}</Text>
						</View>
				  </View>
				)
		  }

		  return (
				<TouchableOpacity onPress={() => this.onRowPress(rowData)}>
				  <View style={{flex:1}}>
						{title}
						{desc}
				  </View>
				</TouchableOpacity>
			)
		}

	  render() {
			let data = this.state.data.slice();

			return (
			  <View style={styles.container}>
					<Timeline
					  style={styles.list}
					  data={data}
					  circleSize={18}
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
					  showTime={false}
					  renderDetail={this.renderDetail}
						lineWidth={1}
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
		paddingTop: 0,
		color: colorSwatch.codGray,
		fontFamily: fontFamily.medium
  },
  date:{
		fontSize: fontSize.small,
		color: colorSwatch.dustyGray,
		fontFamily: fontFamily.medium
  },
  activityTitleContainer:{
		flex: 1,
		flexDirection: 'row',
		paddingRight: 15,
		paddingTop: 0,
		marginTop: 0,
		alignItems: 'center',
		marginBottom: 20
  },
  activityTitleDatetime: {
		flex: 1,
		alignItems: 'flex-end'
  },
  descriptionContainer:{
		flexDirection: 'row',
		paddingRight: 10
  },
  doctorName: {
		fontSize: fontSize.medium,
		color: colorSwatch.dustyGray,
		fontFamily: fontFamily.medium
  }
});

export default connect(stateMap)(ActivityLogTimeline);
