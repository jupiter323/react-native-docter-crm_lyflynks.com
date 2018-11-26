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
  return { upcoming };
};

class ActivityLogTimeline extends Component {
  constructor(props){
		super(props)

		this.renderDetail = this.renderDetail.bind(this);
		this.onRowPress = this.onRowPress.bind(this);
		let data = this.props.data.slice();
		this.state = { 'data': data };
  }

  renderTitle = (word) => {
		return word.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) {
			return key.toUpperCase()
			}
		);
  }

	onRowPress = (data) => {
		if (data.type === 'check_in') {
			this.props.navigation.navigate('CheckInDetailsScreen', { id: data.id });
		}
	}

	renderWhen(date) {
		if (date == 'TBD') {
			return '';
		}

		return moment(date).format('MMMM D/h:mma');
	}

  renderDetail(rowData, sectionID, rowID) {
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
				  options={{ style:{ paddingTop:0 } }}
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
