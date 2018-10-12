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
import SegmentedControlTab from 'react-native-segmented-control-tab'
 
 
export default class DatePicker extends React.Component {
   
  constructor(){
    super()
    this.state = {
      selectedIndex: 0,
    };
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  }

  render() {
      return (
          <View>
              <SegmentedControlTab
                  values={['First', 'Second', 'Third']}
                  selectedIndex={this.state.selectedIndex}
                  onTabPress={this.handleIndexChange}
                  />
          </View>
      );
  }
 
}